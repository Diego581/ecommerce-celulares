const API_URL = 'http://localhost:5000';

export const equipoService = {
  // Obtener equipos (GET)
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
  },

  // Crear un nuevo equipo (POST)
  createEquipo: async (newEquipo) => {
    try {
      const response = await fetch(`${API_URL}/api/equipos`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(newEquipo)
      });

      console.log('Request URL:', `${API_URL}/api/equipos`);
      console.log('Response status:', response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Equipo creado:', data);
      return data;
    } catch (error) {
      console.error('Error creating equipo:', error);
      throw new Error('Error al crear equipo: ' + error.message);
    }
  },

  // Editar un equipo existente (PUT)
  updateEquipo: async (id, updatedEquipo) => {
    try {
      const response = await fetch(`${API_URL}/api/equipos/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(updatedEquipo)
      });

      console.log('Request URL:', `${API_URL}/api/equipos/${id}`);
      console.log('Response status:', response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Equipo actualizado:', data);
      return data;
    } catch (error) {
      console.error('Error updating equipo:', error);
      throw new Error('Error al actualizar equipo: ' + error.message);
    }
  },

  // Eliminar un equipo (DELETE)
  deleteEquipo: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/equipos/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });

      console.log('Request URL:', `${API_URL}/api/equipos/${id}`);
      console.log('Response status:', response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Equipo eliminado');
      return { message: 'Equipo eliminado' };
    } catch (error) {
      console.error('Error deleting equipo:', error);
      throw new Error('Error al eliminar equipo: ' + error.message);
    }
  }
};
