export const host = process.env.HOST || "http://localhost:8000";

export const personalEndpoint = `${host}/api/personal`;
export const campusEndpoint = `${host}/api/campus`;
export const assistanceEndpoint = `${host}/api/assistance`;
export const medicalPersonalDataEndpoint = `${host}/api/medical-personal-data`;
export const assistancePersonalIdentificatorEndpoint = `${host}/api/assistance-personal-identificator`;
export const institutionalPersonalDataEndpoint = `${host}/api/institutional-personal-data`;
export const personalSchedulesEndpoint = `${host}/api/personal-schedule`;
export const titlesEndpoint = `${host}/api/title`;
export const certificationsEndpoint = `${host}/api/certification`;