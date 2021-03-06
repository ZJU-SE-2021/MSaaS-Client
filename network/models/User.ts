/* tslint:disable */
/* eslint-disable */
/**
 * MsaasBackend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Gender,
    GenderFromJSON,
    GenderFromJSONTyped,
    GenderToJSON,
} from './';

/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {number}
     * @memberof User
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    username?: string | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    passwordHash?: string | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    role?: string | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    name?: string | null;
    /**
     * 
     * @type {Gender}
     * @memberof User
     */
    gender?: Gender;
    /**
     * 
     * @type {Date}
     * @memberof User
     */
    birthday?: Date | null;
    /**
     * 
     * @type {number}
     * @memberof User
     */
    readonly age?: number | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    phone?: string | null;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    email?: string | null;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'username': !exists(json, 'username') ? undefined : json['username'],
        'passwordHash': !exists(json, 'passwordHash') ? undefined : json['passwordHash'],
        'role': !exists(json, 'role') ? undefined : json['role'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'gender': !exists(json, 'gender') ? undefined : GenderFromJSON(json['gender']),
        'birthday': !exists(json, 'birthday') ? undefined : (json['birthday'] === null ? null : new Date(json['birthday'])),
        'age': !exists(json, 'age') ? undefined : json['age'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'email': !exists(json, 'email') ? undefined : json['email'],
    };
}

export function UserToJSON(value?: User | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'username': value.username,
        'passwordHash': value.passwordHash,
        'role': value.role,
        'name': value.name,
        'gender': GenderToJSON(value.gender),
        'birthday': value.birthday === undefined ? undefined : (value.birthday === null ? null : value.birthday.toISOString()),
        'phone': value.phone,
        'email': value.email,
    };
}


