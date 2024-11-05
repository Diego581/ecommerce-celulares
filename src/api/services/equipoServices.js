const API_URL = 'http://127.0.0.1:5000';

const equipoService = {
  getEquipos: async () => {
    try {
      const response = await fetch(`${API_URL}/api/equipos`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors' 
      });

      console.log('Request URL:', `${API_URL}/api/equipos`);
      console.log('Response status:', response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Equipos recibidos:', data);
      return data;
    } catch (error) {
      console.error('Error fetching equipos:', error);
      throw new Error('Error al obtener equipos: ' + error.message);
    }
  }
};

export default equipoService;