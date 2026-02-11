import { createClient } from '@insforge/sdk';

const insforge = createClient({
    baseUrl: 'https://969qa4ei.us-west.insforge.app',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjE5NDV9.JR9cOI_eo16Jwy5MO8K684KMsr-61AiFC6CLRENGTq4',
});

export default insforge;
