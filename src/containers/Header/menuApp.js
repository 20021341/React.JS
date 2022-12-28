export const headquarterMenu = [
    {   // ban điều hành
        name: 'Quản lý',
        menus: [
            {
                name: 'Cơ sở',
                link: '/hq/facility-manage'
            },
            {
                name: 'Khách hàng',
                link: '/hq/customer-manage'
            },
            {
                name: 'Dòng sản phẩm',
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
                name: 'Sản phẩm tồn kho',
                link: '/agent/good-products-manage'
            },
            {
                name: 'Sản phẩm bảo hành, lỗi',
                link: '/agent/bad-products-manage'
            },
            {
                name: 'Hóa đơn bán hàng',
                link: '/agent/bills-manage'
            },
            {
                name: 'Phiếu bảo hành',
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
                link: '/factory/statistics'
            },
            {
                name: 'Sản phẩm tồn kho',
                link: '/factory/good-products-manage'
            },
            {
                name: 'Sản phẩm lỗi',
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
                name: 'Sản phẩm bảo hành',
                link: '/center/bad-products-manage'
            },
        ]
    },
];