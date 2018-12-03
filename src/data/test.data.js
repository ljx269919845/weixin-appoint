const myappoint = [{
    appointId: 123131,
    appointDate: '2018-11-17',
    appointTime: '13:00-14:00',
    departmentName: '全科',
    departmentId: 13
}];

const departments=[
    {
        departmentId: 1,
        departmentName: '全科'
    },
    {
        departmentId: 2,
        departmentName: '儿科'
    },
    {
        departmentId: 3,
        departmentName: '妇科'
    }
];

const appoints = [
    {  
         appointDate: '2018-11-18',
        appointTime: [{
            timeId: 1,
            timeName: '8:00-9:00',
            count: [{
                departmentId: 1,
                count: 10
                },
                {
                    departmentId: 3,
                    count: 10
                }
            ]
        },

        {
            timeId: 2,
            timeName: '9:00-10:00',
            count: [{
                departmentId: 2,
                count: 10
                },
                {
                    departmentId: 3,
                    count: 8
                }
            ]
        },

        {
            timeId: 3,
            timeName: '10:00-11:00',
            count: [{
                departmentId: 1,
                count: 20
                },
                {
                    departmentId: 3,
                    count: 10
                }
            ]
        },

        {
            timeId: 4,
            timeName: '11:00-12:00',
            count: [{
                departmentId: 1,
                count: 10
                },
                {
                    departmentId: 2,
                    count: 11
                }
            ]
        },

        {
            timeId: 5,
            timeName: '2:00-3:00',
            count: [{
                departmentId: 1,
                count: 10
                },
                {
                    departmentId: 2,
                    count: 10
                }
            ]
        },

        {
            timeId: 6,
            timeName: '3:00-4:00',
            count: [{
                departmentId: 1,
                count: 10
                },
                {
                    departmentId: 3,
                    count: 10
                }
            ]
        },

        {
            timeId: 7,
            timeName: '4:00-5:00',
            count: [{
                departmentId: 1,
                count: 10
                },
                {
                    departmentId: 2,
                    count: 10
                }
            ]
        },

        {
            timeId: 8,
            timeName: '5:00-6:00',
            count: [{
                departmentId: 1,
                count: 10
                },
                {
                    departmentId: 2,
                    count: 10
                }
            ]
        }
    ]
    }
];


export {myappoint, appoints, departments};    