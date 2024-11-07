const API_URL = 'http://localhost:5000';


const userService = {
  // Obtener usuarios (GET)
  getUsers: async () => {
    try {
        const response = await fetch(`${API_URL}/api/usuarios`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          mode: 'cors'
        });
  

      console.log('Requesting:', `${API_URL}/api/usuarios`);

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
  },

  getUser: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: "cors"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Error al obtener usuario: ' + error.message);
    }
  },

  // Crear un nuevo usuario (POST)
  createUser: async (newUser) => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify(newUser)
      });

      console.log('Request URL:', `${API_URL}/api/usuarios`);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Usuario creado:', data);
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error al crear usuario: ' + error.message);
    }
  },

  // Editar un usuario existente (PUT)
  updateUser: async (id, updatedUser) => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode:"cors",
        body: JSON.stringify(updatedUser)
      });

      console.log('Request URL:', `${API_URL}/api/usuarios/${id}`);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Usuario actualizado:', data);
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  },

  // Eliminar un usuario (DELETE)
  deleteUser: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode:"cors"
      });

      console.log('Request URL:', `${API_URL}/api/usuarios/${id}`);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Usuario eliminado');
      return { ok:true ,message: 'Usuario eliminado' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Error al eliminar usuario: ' + error.message);
    }
  },
  loginUser: async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });

      console.log('Request URL:', `${API_URL}/api/usuarios`);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('login:', data["access_token"]);
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error al crear usuario: ' + error.message);
    }
  },
};
export default userService;
