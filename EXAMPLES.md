# Code Examples for Roast My Code

Here are some classic "bad code" examples you can paste into the editor to see the roaster in action. Each example demonstrates common anti-patterns and coding mistakes.

---

## 1. Callback Hell (The Pyramid of Doom)

A classic example of nested callbacks that create unreadable, unmaintainable code.

```javascript
// The pyramid of doom - fetching user data with nested callbacks
function getUserData(userId, callback) {
  fetchUser(userId, function(user) {
    fetchPermissions(user.id, function(perms) {
      fetchSettings(user.id, function(settings) {
        fetchPreferences(user.id, function(prefs) {
          fetchHistory(user.id, function(history) {
            fetchFriends(user.id, function(friends) {
              fetchPosts(user.id, function(posts) {
                callback({
                  user: user,
                  perms: perms,
                  settings: settings,
                  prefs: prefs,
                  history: history,
                  friends: friends,
                  posts: posts
                });
              });
            });
          });
        });
      });
    });
  });
}
```

**Issues:** Nested callbacks, no error handling, callback hell, hard to read and maintain.

---

## 2. var + Global Variables + Loose Equality

Welcome back to 2010! This code has it all: `var`, global variable leaks, and loose equality comparisons.

```javascript
// What year is this?
var userData = null;
var isLoggedIn = false;
var userCount = 0;

function checkUser(user) {
  if (user.name == undefined) {
    return false;
  }
  if (user.id == "0") {
    userData = user;
    isLoggedIn = true;
    return true;
  }
  if (user.role == "admin" || user.role == "superuser" || user.role == "root") {
    console.log("Admin detected!");
    userCount = userCount + 1;
    return true;
  }
  return false;
}

function updateCount() {
  count = count + 1;  // Oops, forgot var! Now it's global
}

function processItems(items) {
  for (var i = 0; i < items.length; i++) {
    setTimeout(function() {
      console.log(items[i]);  // Classic closure problem!
    }, 100);
  }
}
```

**Issues:** `var` usage, global variable leak, `==` instead of `===`, closure in loop problem, no `let`/`const`.

---

## 3. AnyScript (TypeScript Misuse)

When you use TypeScript but ignore all its benefits.

```typescript
// TypeScript? More like AnyScript
function processData(data: any): any {
  const result = data.map((item: any) => {
    if (item.type == 'user') {
      return {
        name: item.name,
        age: parseInt(item.age),
        active: item.active == 'true'
      }
    }
    return item
  })
  
  const filtered = result.filter((x: any) => x)
  const sorted = filtered.sort((a: any, b: any) => a.name - b.name)
  
  return sorted
}

async function saveData(data: any) {
  const response = await fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  // No error handling, no return type, just vibes
  return response.json()
}

// What's the point of TypeScript again?
interface User {
  name: any
  age: any
  role: any
  settings: any
  data: any
}
```

**Issues:** `any` everywhere, no proper typing, loose equality, no error handling, defeats the purpose of TypeScript.

---

## 4. God Class (Doing Too Much)

One class to rule them all... and violate every principle of clean code.

```javascript
// One class to rule them all
class UserManager {
  constructor() {
    this.users = []
    this.cache = {}
    this.logs = []
    this.connections = []
  }

  createUser(data) { /* 50 lines of code */ }
  deleteUser(id) { /* 30 lines of code */ }
  updateUser(id, data) { /* 40 lines of code */ }
  validateUser(user) { /* 20 lines of code */ }
  sendEmail(user, template) { /* 30 lines of code */ }
  sendSMS(user, message) { /* 25 lines of code */ }
  generateReport(type) { /* 100 lines of code */ }
  calculateMetrics() { /* 80 lines of code */ }
  exportToCsv() { /* 40 lines of code */ }
  exportToJson() { /* 30 lines of code */ }
  importFromCsv(data) { /* 50 lines of code */ }
  importFromJson(data) { /* 40 lines of code */ }
  syncWithApi() { /* 60 lines of code */ }
  authenticate(username, password) { /* 40 lines of code */ }
  managePermissions(userId, roles) { /* 50 lines of code */ }
  handleNotifications() { /* 35 lines of code */ }
  validatePermissions() { /* 25 lines of code */ }
  // ... and 20 more methods
}
```

**Issues:** Single Responsibility Principle violation, does too many things, hard to test, hard to maintain, god object anti-pattern.

---

## 5. Sequential Awaits in a Loop

Using `await` inside a loop - a classic performance killer.

```javascript
// Performance? What's that?
async function processUsers(users) {
  const results = []
  
  // Sequential awaits - great idea! 🙃
  for (var i = 0; i < users.length; i++) {
    const profile = await fetchProfile(users[i].id)
    const posts = await fetchPosts(users[i].id)
    const comments = await fetchComments(users[i].id)
    
    results.push({
      user: users[i],
      profile: profile,
      posts: posts,
      comments: comments
    })
  }
  
  return results
}

// Another masterpiece
async function fetchAllData(ids) {
  const data = []
  
  for (const id of ids) {
    const item = await fetch(`/api/items/${id}`)
    data.push(await item.json())
  }
  
  return data
}
```

**Issues:** Sequential awaits instead of parallel, `var` in loop, slow performance, should use `Promise.all()`.

---

## 6. Error Handling? Never Heard of It

What could possibly go wrong?

```javascript
// What could possibly go wrong?
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`)
  const data = await response.json()
  return data
}

function processArray(arr) {
  return arr.map(item => item.value.toFixed(2))
}

function calculateTotal(items) {
  let total = 0
  for (const item of items) {
    total += item.price * item.quantity
  }
  return total
}

function getUserEmail(user) {
  return user.profile.contact.email.primary
}
```

**Issues:** No error handling, no null checks, no validation, will crash on any unexpected input.

---

## Tips for Maximum Roast Impact

1. **Choose Linus mode** for the most entertaining (and brutal) feedback
2. **Try different personas** to see how the same code gets roasted differently
3. **Mix and match** patterns from different examples
4. **Add your own bad code** to see what the AI catches

---

## What Makes Code "Roastable"?

| Pattern | Why It's Bad |
|---------|--------------|
| `var` | Outdated, has function scope issues |
| `==` instead of `===` | Type coercion surprises |
| Global variables | Namespace pollution, hard to track |
| Callback hell | Unreadable, unmaintainable |
| `any` type | Defeats TypeScript's purpose |
| God class | Single Responsibility Principle violation |
| Sequential awaits | Performance killer |
| No error handling | Will crash in production |

Happy roasting! 🔥
