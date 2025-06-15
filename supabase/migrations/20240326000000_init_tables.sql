-- ✅ 创建 customers 表，用于关联 Supabase 用户和你的系统中的客户（Creem用户）
create table public.customers (
    id uuid primary key default uuid_generate_v4(), -- 主键，自带唯一值
    user_id uuid references auth.users(id) on delete cascade not null, -- 关联 Supabase 用户ID，删除用户时一并删除
    creem_customer_id text not null unique, -- Creem 中的客户ID，必须唯一
    email text not null, -- 邮箱，必须填写
    name text, -- 客户姓名，可选
    country text, -- 国家，可选
    credits integer default 0 not null, -- 积分，默认 0，不能为空
    created_at timestamp with time zone default timezone('utc'::text, now()) not null, -- 创建时间
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null, -- 更新时间
    metadata jsonb default '{}'::jsonb, -- 可扩展的元数据（JSON格式）
    constraint customers_email_match check (email = lower(email)), -- 限制邮箱小写
    constraint credits_non_negative check (credits >= 0) -- 积分不能为负
);

-- ✅ 创建积分变动记录表（credits_history），用于记录用户积分变更明细
create table public.credits_history (
    id uuid primary key default uuid_generate_v4(),
    customer_id uuid references public.customers(id) on delete cascade not null, -- 关联客户
    amount integer not null, -- 数值，正负都可
    type text not null check (type in ('add', 'subtract')), -- 类型：加积分还是减积分
    description text, -- 说明，可选
    creem_order_id text, -- 若关联订单，可填订单ID
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb default '{}'::jsonb
);

-- ✅ 创建订阅表（subscriptions），记录用户的订阅信息
create table public.subscriptions (
    id uuid primary key default uuid_generate_v4(),
    customer_id uuid references public.customers(id) on delete cascade not null,
    creem_subscription_id text not null unique, -- 订阅ID
    creem_product_id text not null, -- 订阅的产品ID
    status text not null check (status in ('incomplete', 'expired', 'active', 'past_due', 'canceled', 'unpaid', 'paused', 'trialing')), -- 状态校验
    current_period_start timestamp with time zone not null,
    current_period_end timestamp with time zone not null,
    canceled_at timestamp with time zone,
    trial_end timestamp with time zone,
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ✅ 创建索引，提高查询效率
create index customers_user_id_idx on public.customers(user_id);
create index customers_creem_customer_id_idx on public.customers(creem_customer_id);
create index subscriptions_customer_id_idx on public.subscriptions(customer_id);
create index subscriptions_status_idx on public.subscriptions(status);
create index credits_history_customer_id_idx on public.credits_history(customer_id);
create index credits_history_created_at_idx on public.credits_history(created_at);

-- ✅ 创建自动更新时间的函数（在更新 customers 和 subscriptions 时自动更新 updated_at 字段）
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- ✅ 为 customers 表添加触发器
create trigger handle_customers_updated_at
    before update on public.customers
    for each row
    execute function public.handle_updated_at();

-- ✅ 为 subscriptions 表添加触发器
create trigger handle_subscriptions_updated_at
    before update on public.subscriptions
    for each row
    execute function public.handle_updated_at();

-- ✅ 启用 RLS（行级权限控制）以确保数据隔离
alter table public.customers enable row level security;
alter table public.subscriptions enable row level security;
alter table public.credits_history enable row level security;

-- ✅ 权限策略 - 让用户只能查看/更新自己的 customers 数据
create policy "Users can view their own customer data"
    on public.customers for select
    using (auth.uid() = user_id);

create policy "Users can update their own customer data"
    on public.customers for update
    using (auth.uid() = user_id);

-- ✅ 后台权限 - service_role 可以管理全部 customers 数据
create policy "Service role can manage customer data"
    on public.customers for all
    using (auth.role() = 'service_role');

-- ✅ 用户策略 - 只允许查看属于自己的订阅
create policy "Users can view their own subscriptions"
    on public.subscriptions for select
    using (
        exists (
            select 1 from public.customers
            where customers.id = subscriptions.customer_id
            and customers.user_id = auth.uid()
        )
    );

-- ✅ 后台权限 - service_role 可以管理所有订阅
create policy "Service role can manage subscriptions"
    on public.subscriptions for all
    using (auth.role() = 'service_role');

-- ✅ 用户策略 - 只允许查看属于自己的积分记录
create policy "Users can view their own credits history"
    on public.credits_history for select
    using (
        exists (
            select 1 from public.customers
            where customers.id = credits_history.customer_id
            and customers.user_id = auth.uid()
        )
    );

-- ✅ 后台权限 - service_role 可以操作所有积分记录
create policy "Service role can manage credits history"
    on public.credits_history for all
    using (auth.role() = 'service_role');

-- ✅ 最后授权 service_role 对三个表拥有所有权限
grant all on public.customers to service_role;
grant all on public.subscriptions to service_role;
grant all on public.credits_history to service_role;