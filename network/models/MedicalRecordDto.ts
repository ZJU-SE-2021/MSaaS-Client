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
/**
 * 
 * @export
 * @interface MedicalRecordDto
 */
export interface MedicalRecordDto {
    /**
     * 
     * @type {number}
     * @memberof MedicalRecordDto
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof MedicalRecordDto
     */
    appointmentId?: number;
    /**
     * 
     * @type {string}
     * @memberof MedicalRecordDto
     */
    symptom?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MedicalRecordDto
     */
    pastMedicalHistory?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MedicalRecordDto
     */
    diagnosis?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MedicalRecordDto
     */
    prescription?: string | null;
}

export function MedicalRecordDtoFromJSON(json: any): MedicalRecordDto {
    return MedicalRecordDtoFromJSONTyped(json, false);
}

export function MedicalRecordDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MedicalRecordDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'appointmentId': !exists(json, 'appointmentId') ? undefined : json['appointmentId'],
        'symptom': !exists(json, 'symptom') ? undefined : json['symptom'],
        'pastMedicalHistory': !exists(json, 'pastMedicalHistory') ? undefined : json['pastMedicalHistory'],
        'diagnosis': !exists(json, 'diagnosis') ? undefined : json['diagnosis'],
        'prescription': !exists(json, 'prescription') ? undefined : json['prescription'],
    };
}

export function MedicalRecordDtoToJSON(value?: MedicalRecordDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'appointmentId': value.appointmentId,
        'symptom': value.symptom,
        'pastMedicalHistory': value.pastMedicalHistory,
        'diagnosis': value.diagnosis,
        'prescription': value.prescription,
    };
}


