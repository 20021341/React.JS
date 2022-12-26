export const headquarterMenu = [
    {   // ban điều hành
        name: 'Quản lý',
        menus: [
            {
                name: 'Quản lý cơ sở',
                link: '/hq/facility-manage'
            },
            {
                name: 'Quản lý khách hàng',
                link: '/hq/customer-manage'
            },
            {
                name: 'Quản lý dòng sản phẩm',
                link: '/hq/product-line-manage'
            },
        ]
    },
];

export const agentMenu = [
    {   // đại lý
        name: 'Quản lý',
        menus: [
            {
                name: 'Thống kê',
                link: '/agent/sales-statistics'
            },
            {
                name: 'Quản lý sản phẩm tốt',
                link: '/agent/good-products-manage'
            },
            {
                name: 'Quản lý sản phẩm xấu',
                link: '/agent/bad-products-manage'
            },
            {
                name: 'Quản lý hóa đơn',
                link: '/agent/bills-manage'
            },
            {
                name: 'Quản lý phiếu bảo hành',
                link: '/agent/cards-manage'
            },
            {
                name: 'Thu hồi sản phẩm lỗi',
                link: '/agent/retrieve-products'
            },
        ]
    },
];

export const factoryMenu = [
    {   // nhà máy
        name: 'Quản lý',
        menus: [
            {
                name: 'Thống kê',
                link: '/factory/sale-rate-statistics'
            },
            {
                name: 'Quản lý sản phẩm tốt',
                link: '/factory/good-products-manage'
            },
            {
                name: 'Quản lý sản phẩm xấu',
                link: '/factory/bad-products-manage'
            },
        ]
    },
];

export const centerMenu = [
    {   // trung tâm bảo hành
        name: 'Quản lý',
        menus: [
            {
                name: 'Thống kê',
                link: '/center/warranty-statistics'
            },
            {
                name: 'Quản lý sản phẩm xấu',
                link: '/center/bad-products-manage'
            },
        ]
    },
];