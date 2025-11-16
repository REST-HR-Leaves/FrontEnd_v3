// Mock Service Worker handlers for development
// Install MSW: npm install msw --save-dev
// Setup: npx msw init public/ --save

import fixtures from './fixtures.json';

// Example structure for MSW handlers (requires MSW installation)
/*
import { rest } from 'msw';

export const handlers = [
  // Auth endpoints
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };
    
    const user = fixtures.employees.find(emp => emp.email === email);
    
    if (!user || password !== 'password') {
      return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-jwt-token-' + user.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
    );
  }),

  // Leaves endpoints
  rest.get('/api/leaves', (req, res, ctx) => {
    const employeeId = req.url.searchParams.get('employeeId');
    
    let leaves = fixtures.leaveRequests;
    if (employeeId) {
      leaves = leaves.filter(leave => leave.employeeId === employeeId);
    }
    
    return res(ctx.status(200), ctx.json(leaves));
  }),

  rest.post('/api/leaves', (req, res, ctx) => {
    const data = req.body as any;
    
    const newLeave = {
      id: 'leave-' + Date.now(),
      employeeId: 'emp-1', // Mock current user
      employeeName: 'John Doe',
      ...data,
    };
    
    return res(ctx.status(201), ctx.json(newLeave));
  }),

  rest.put('/api/leaves/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { status } = req.body as { status: string };
    
    const leave = fixtures.leaveRequests.find(l => l.id === id);
    
    if (!leave) {
      return res(ctx.status(404), ctx.json({ message: 'Leave not found' }));
    }
    
    const updatedLeave = { ...leave, status };
    
    return res(ctx.status(200), ctx.json(updatedLeave));
  }),

  // Employee endpoints
  rest.get('/api/employees/:id', (req, res, ctx) => {
    const { id } = req.params;
    const employee = fixtures.employees.find(emp => emp.id === id);
    
    if (!employee) {
      return res(ctx.status(404), ctx.json({ message: 'Employee not found' }));
    }
    
    return res(ctx.status(200), ctx.json(employee));
  }),

  rest.get('/api/employees/:id/balance', (req, res, ctx) => {
    const { id } = req.params;
    const employee = fixtures.employees.find(emp => emp.id === id);
    
    if (!employee) {
      return res(ctx.status(404), ctx.json({ message: 'Employee not found' }));
    }
    
    return res(ctx.status(200), ctx.json({ balance: employee.balance }));
  }),
];
*/

// To use these handlers:
// 1. Install MSW: npm install msw --save-dev
// 2. Initialize: npx msw init public/ --save
// 3. Create browser.ts with setupWorker
// 4. Import and start in main.tsx in development mode

export default {};
