import axios from 'axios';
import { Photo, User } from '../types/interfaces';

const apiUrl = 'https://jsonplaceholder.typicode.com';

export const fetchPhotos = async (): Promise<Photo[]> => {
    try {
        const response = await axios.get<Photo[]>(`${apiUrl}/photos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${apiUrl}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
