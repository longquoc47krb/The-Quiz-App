/* eslint-disable prettier/prettier */
import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
    USER = 'USER',
    ADMIN = 'ADMIN',
    GUEST = 'GUEST'
}

export enum AppResource {
    QUESTION = 'QUESTION',
    QUIZ = 'QUIZ',
    USER = 'USER'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    // AUTHOR ROLES
    .grant(AppRoles.USER)
    .updateOwn([AppResource.USER])
    .deleteOwn([AppResource.USER])
    .createOwn([AppResource.QUESTION])
    .updateOwn([AppResource.QUESTION])
    .deleteOwn([AppResource.QUESTION])
    .createOwn([AppResource.QUIZ])
    .updateOwn([AppResource.QUIZ])
    .deleteOwn([AppResource.QUIZ])
    // ADMIN ROLES
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.USER)
    .createAny([AppResource.USER])
    .updateAny([AppResource.QUIZ, AppResource.USER])
    .deleteAny([AppResource.QUIZ, AppResource.USER]);
