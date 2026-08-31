import axios from "axios";

export const IDENTITY_API_URL = import.meta.env.VITE_IDENTITY_API_URL;
const CURRICULUM_API_URL = import.meta.env.VITE_CURRICULUM_API_URL;
const CONTENT_API_URL = import.meta.env.VITE_CONTENT_API_URL;

const identity_api = axios.create({
    baseURL: `${IDENTITY_API_URL}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

const curriculum_api = axios.create({
    baseURL: `${CURRICULUM_API_URL}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const content_api = axios.create({
    baseURL: `${CONTENT_API_URL}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export {
    identity_api,
    curriculum_api,
    content_api
}