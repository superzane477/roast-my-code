import type { SampleCode } from '../types'

export const samples: SampleCode[] = [
  {
    id: 'callback-hell',
    name: 'Callback Hell',
    language: 'javascript',
    code: `// A beautiful disaster of nested callbacks
function fetchUserData(userId, callback) {
  database.connect(function(err, conn) {
    if (err) callback(err);
    conn.query('SELECT * FROM users WHERE id = ?', [userId], function(err, user) {
      if (err) callback(err);
      conn.query('SELECT * FROM orders WHERE user_id = ?', [userId], function(err, orders) {
        if (err) callback(err);
        orders.forEach(function(order) {
          conn.query('SELECT * FROM items WHERE order_id = ?', [order.id], function(err, items) {
            if (err) callback(err);
            order.items = items;
            if (orders.indexOf(order) === orders.length - 1) {
              user.orders = orders;
              callback(null, user);
            }
          });
        });
      });
    });
  });
}`
  },
  {
    id: 'god-class',
    name: 'God Class',
    language: 'javascript',
    code: `// One class to rule them all
class UserManager {
  constructor() {
    this.users = [];
    this.logger = new Logger();
    this.db = new Database();
    this.emailService = new EmailService();
    this.cache = new Cache();
    this.analytics = new Analytics();
  }

  createUser(data) { /* 100 lines */ }
  deleteUser(id) { /* 50 lines */ }
  updateUser(id, data) { /* 80 lines */ }
  validateUser(user) { /* 40 lines */ }
  sendWelcomeEmail(user) { /* 30 lines */ }
  generateReport() { /* 200 lines */ }
  calculateMetrics() { /* 150 lines */ }
  exportToCsv() { /* 60 lines */ }
  importFromJson() { /* 70 lines */ }
  syncWithExternalApi() { /* 120 lines */ }
  handleAuthentication() { /* 90 lines */ }
  managePermissions() { /* 110 lines */ }
  // ... 20 more methods
}`
  },
  {
    id: 'no-types',
    name: 'No Types JS',
    language: 'javascript',
    code: `// What could possibly go wrong?
function process(data) {
  const result = data.map(item => {
    if (item.type == 'user') {
      return {
        name: item.name,
        age: parseInt(item.age),
        active: item.active == 'true'
      }
    } else if (item.type === 'product') {
      return {
        title: item.name,
        price: item.price,
        stock: item.qty
      }
    }
    return item
  })

  const filtered = result.filter(x => x)
  const sorted = filtered.sort((a, b) => a.name - b.name)

  return sorted
}

function calculateTotal(items) {
  let total = 0
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price
  }
  return total
}`
  },
  {
    id: 'async-await-mistakes',
    name: 'Async/Await Gone Wrong',
    language: 'javascript',
    code: `// Async confusion at its finest
async function getUsers() {
  const users = await fetch('/users')
  return users.json()
}

async function getOrders(userId) {
  const orders = await fetch('/orders?user=' + userId)
  return orders.json()
}

async function getUserData() {
  const users = await getUsers()

  // Sequential awaits in a loop - excellent choice!
  const results = []
  for (var i = 0; i < users.length; i++) {
    const orders = await getOrders(users[i].id)
    results.push({
      user: users[i],
      orders: orders
    })
  }

  return results
}

async function saveData(data) {
  // Who needs error handling anyway?
  const response = await fetch('/save', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  // Return the whole response, caller can figure it out
  return response
}`
  }
]
