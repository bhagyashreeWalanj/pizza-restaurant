import axios from 'axios';

const API_URL = 'https://624b52c271e21eebbcf0b4ba.mockapi.io/';

export const getAllMenus = () => {
    return axios.get(API_URL + 'menus');
}