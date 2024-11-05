const API_URL = 'https://api-flask-production-20dd.up.railway.app';

const userService = {
  getUsers: async () => {
    try {
      
      const response = await fetch(`${API_URL}/api/api/usuarios`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      console.log('Requesting:', `${API_URL}/api/api/usuarios`); 

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Datos recibidos:', data); 
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Error al obtener usuarios: ' + error.message);
    }
  }
};

export default userService;