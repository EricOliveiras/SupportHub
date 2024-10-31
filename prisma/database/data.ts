import {
    Permission,
    Permission_Role,
    Role,
    Sector
} from '@prisma/client';

export const roles: Role[] = [
    {
        id: 1,
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
    },
];

export const permissions: Permission[] = [
    {
        id: 1,
        name: 'create:user',
        description: null,
        created_at: new Date(),
    },
    {
        id: 2,
        name: 'read:user',
        description: null,
        created_at: new Date(),
    },
    {
        id: 3,
        name: 'read:user:list',
        description: null,
        created_at: new Date(),
    },
    {
        id: 4,
        name: 'update:user',
        description: null,
        created_at: new Date(),
    },
    {
        id: 5,
        name: 'delete:user',
        description: null,
        created_at: new Date(),
    },
    {
        id: 6,
        name: 'create:ticket',
        description: null,
        created_at: new Date(),
    },
    {
        id: 7,
        name: 'read:ticket',
        description: null,
        created_at: new Date(),
    },
    {
        id: 8,
        name: 'read:ticket:list',
        description: null,
        created_at: new Date(),
    },
    {
        id: 9,
        name: 'update:ticket',
        description: null,
        created_at: new Date(),
    },
    {
        id: 10,
        name: 'delete:ticket',
        description: null,
        created_at: new Date(),
    },
    {
        id: 11,
        name: 'read:me',
        description: null,
        created_at: new Date(),
    },
    {
        id: 12,
        name: 'create:sector',
        description: null,
        created_at: new Date(),
    },
    {
        id: 13,
        name: 'read:sector',
        description: null,
        created_at: new Date(),
    },
    {
        id: 14,
        name: 'read:sector:list',
        description: null,
        created_at: new Date(),
    },
    {
        id: 15,
        name: 'update:sector',
        description: null,
        created_at: new Date(),
    },
    {
        id: 16,
        name: 'delete:sector',
        description: null,
        created_at: new Date(),
    }
    ,
    {
        id: 17,
        name: 'ticket:assignedTo',
        description: null,
        created_at: new Date(),
    }
];

export const permission_role: Permission_Role[] = [
    {role_id: 1, permission_id: 1},
    {role_id: 1, permission_id: 2},
    {role_id: 1, permission_id: 3},
    {role_id: 1, permission_id: 4},
    {role_id: 1, permission_id: 5},
    {role_id: 1, permission_id: 6},
    {role_id: 1, permission_id: 7},
    {role_id: 1, permission_id: 8},
    {role_id: 1, permission_id: 9},
    {role_id: 1, permission_id: 10},
    {role_id: 1, permission_id: 11},
    {role_id: 1, permission_id: 12},
    {role_id: 1, permission_id: 13},
    {role_id: 1, permission_id: 14},
    {role_id: 1, permission_id: 15},
    {role_id: 1, permission_id: 16},
    {role_id: 1, permission_id: 17},
    {role_id: 2, permission_id: 4},
    {role_id: 2, permission_id: 6},
    {role_id: 2, permission_id: 7},
    {role_id: 2, permission_id: 8},
    {role_id: 2, permission_id: 9},
    {role_id: 2, permission_id: 10},
    {role_id: 2, permission_id: 11}
];

export const sectors: Omit<Sector, 'id'>[] = [
    {name: 'SEMAD-DAL'},
    {name: 'SEMAD-DTI'},
    {name: 'SEMAD-DGP'},
    {name: 'SEMAD-DSO'},
    {name: 'SEMAD-EGPA'},
    {name: 'SEMAD-GAB'},
    {name: 'SEMAD-NUCOM'},
    {name: 'SEMAD-NUJUR'},
    {name: 'SEMAD-SA'}
];