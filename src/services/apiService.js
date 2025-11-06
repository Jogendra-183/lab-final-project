import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock data
const artworks = [
  { id: 1, title: 'Starry Night', artist: 'Van Gogh',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop',
    style: 'Modern', price: 1500, status: 'For Sale' },
  { id: 2, title: 'Abstract Paint', artist: 'Jane Doe',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664438942574-e56510dc5ce5?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
    style: 'Abstract', price: 2500, status: 'Sold' },
  { id: 3, title: 'The Scream', artist: 'Edvard Munch',
    imageUrl: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
    style: 'Modern', price: 700, status: 'For Sale' },
  { id: 4, title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer',
    imageUrl: 'https://images.unsplash.com/photo-1533158388470-9a56699990c6?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
    style: 'Impressionism', price: 3000, status: 'For Sale' },
  { id: 5, title: 'Mona Lisa', artist: 'Leonardo da Vinci',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFjcnlsaWMlMjBwYWludHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    style: 'Impressionism', price: 450, status: 'For Sale' },
  { id: 6, title: 'The Night Watch', artist: 'Rembrandt',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664438942574-e56510dc5ce5?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
    style: 'Abstract', price: 1800, status: 'For Sale' },
  { id: 7, title: 'Van Gogh Self-Portrait', artist: 'Van Gogh',
    imageUrl: 'https://images.unsplash.com/flagged/photo-1567934150921-7632371abb32?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    style: 'Modern', price: 2200, status: 'For Sale' },
  { id: 8, title: 'Colorful Abstract', artist: 'John Smith',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1689518469157-e249bd4083dd?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    style: 'Abstract', price: 900, status: 'For Sale' },
  { id: 9, title: 'Impression, Sunrise', artist: 'Claude Monet',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1675378165346-5f6c3959f0d2?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBhcnQlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    style: 'Impressionism', price: 3100, status: 'For Sale' },
  { id: 10, title: 'The Kiss', artist: 'Gustav Klimt',
    imageUrl: 'https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/134047/301032/handmade%2Fdownscaled%2Fh_as1gi7q048i_2000x2000__03459.1740116562.jpg?c=2',
    style: 'Modern', price: 4000, status: 'For Sale' },
  { id: 11, title: 'The Wave', artist: 'Hokusai',
    imageUrl: 'https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/69416/259357/1620280129729_ABS0513_1212__94177.1687167508.jpg?c=2&imbypass=on',
    style: 'Modern', price: 1200, status: 'For Sale' },
  { id: 12, title: 'Still Life', artist: 'Paul Cézanne',
    imageUrl: 'https://metalkart.in/cdn/shop/files/abstractthe-artists-palette-canvas-wall-painting-36-x-24-inches-172257.jpg?v=1715902594',
    style: 'Impressionism', price: 600, status: 'For Sale' }
];

const exhibitions = [
  { id: 1, title: 'Modern Art Showcase', status: 'Published' },
  { id: 2, title: 'Abstract Dreams', status: 'Draft' }
];

const users = {
  'artist@example.com':  { id: 'u1', fullName: 'Art Artist',   email: 'artist@example.com',  role: 'artist',  password: 'password123' },
  'curator@example.com': { id: 'u2', fullName: 'Chris Curator', email: 'curator@example.com', role: 'curator', password: 'password123' },
  'viewer@example.com':  { id: 'u3', fullName: 'Val Viewer',    email: 'viewer@example.com',  role: 'viewer',  password: 'password123' }
};

const apiService = axios.create({
  baseURL: '/api',
  timeout: 5000
});

// Mock setup
const mock = new MockAdapter(apiService, { delayResponse: 500 });

// Auth
mock.onPost('/login').reply(config => {
  const { email, password } = JSON.parse(config.data);
  const user = users[email];
  if (user && user.password === password) {
    const { password: _password, ...userWithoutPass } = user;
    return [200, { token: `${user.id}-fake-token`, user: userWithoutPass }];
  }
  return [401, { message: 'Invalid email or password' }];
});

mock.onPost('/signup').reply(config => {
  const { email, role, fullName, password } = JSON.parse(config.data);
  if (users[email]) {
    return [400, { message: 'Email already in use' }];
  }
  const newUser = { id: `u${Object.keys(users).length + 1}`, fullName, email, role, password };
  users[email] = newUser;
  const { password: _pw, ...userWithoutPass } = newUser;
  return [201, { token: `${newUser.id}-fake-token`, user: userWithoutPass }];
});

// Data endpoints
mock.onGet('/artworks').reply(200, artworks);
mock.onGet('/my-artworks').reply(200, artworks.slice(0, 2));
mock.onGet('/exhibitions').reply(200, exhibitions);

// Attach token if present
apiService.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

export default apiService;
