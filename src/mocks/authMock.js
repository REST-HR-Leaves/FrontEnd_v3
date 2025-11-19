export const mockUsers = [
  {
    id: "1",
    role: "manager",
    email: "manager@company.com",
    password: "123456",
    name: "Sewalim"
  },
  {
    id: "2",
    role: "hr",
    email: "hr@company.com",
    password: "123456",
    name: "Asmaa"
  },
  {
    id: "emp-1",
    role: "employee",
    email: "anas@gmail.com",
    password: "123456",
    name: "anas"
  },
  {
    id: "emp-2",
    role: "employee",
    email: "samir@company.com",
    password: "123456",
    name: "Samir"
  },
  {
    id: "emp-3",
    role: "employee",
    email: "said@company.com",
    password: "123456",
    name: "Said"
  },
  {
    id: "emp-4",
    role: "employee",
    email: "rawan@company.com",
    password: "123456",
    name: "Eng Rawan"
  },
  {
    id: "emp-5",
    role: "employee",
    email: "fady@company.com",
    password: "123456",
    name: "Eng Fady"
  },
  {
    id: "emp-6",
    role: "employee",
    email: "saber@company.com",
    password: "123456",
    name: "Saber"
  }
];

export const mockLogin = (email, password) => {
  // Get all users from localStorage (including dynamically created ones)
  const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  const allUsers = [...mockUsers, ...storedUsers];
  
  const user = allUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const token = `mock-token-${user.id}-${Date.now()}`;
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

export const mockSignup = (name, email, password) => {
  // Check if user already exists
  const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  const allUsers = [...mockUsers, ...storedUsers];
  
  const existingUser = allUsers.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Create new employee user
  const newUser = {
    id: `emp-${Date.now()}`,
    role: "employee",
    email,
    password,
    name
  };
  
  // Store in localStorage
  storedUsers.push(newUser);
  localStorage.setItem('mockUsers', JSON.stringify(storedUsers));
  
  const token = `mock-token-${newUser.id}-${Date.now()}`;
  return {
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  };
};
