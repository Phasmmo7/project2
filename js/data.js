const DataStore = {
  KEYS: {
    USER: 'subsmart_user',
    SUBSCRIPTIONS: 'subsmart_subscriptions',
    SETTINGS: 'subsmart_settings'
  },

  PLATFORMS: {
    'Netflix': { color: '#E50914', icon: 'N' },
    'Prime': { color: '#00A8E1', icon: 'P' },
    'Hotstar': { color: '#1F80E0', icon: 'H' },
    'Spotify': { color: '#1DB954', icon: 'S' },
    'YouTube Premium': { color: '#FF0000', icon: 'Y' }
  },

  getUser() {
    const data = localStorage.getItem(this.KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser(user) {
    localStorage.setItem(this.KEYS.USER, JSON.stringify(user));
  },

  clearUser() {
    localStorage.removeItem(this.KEYS.USER);
  },

  getSubscriptions() {
    const data = localStorage.getItem(this.KEYS.SUBSCRIPTIONS);
    return data ? JSON.parse(data) : this.getDemoData();
  },

  setSubscriptions(subscriptions) {
    localStorage.setItem(this.KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
  },

  getDemoData() {
    const today = new Date();
    const subscriptions = [
      {
        id: this.generateId(),
        platform: 'Netflix',
        cost: 499,
        billingCycle: 'monthly',
        nextRenewal: this.addDays(today, 5),
        lastPayment: this.addDays(today, -25),
        startDate: this.addMonths(today, -6),
        type: 'premium',
        paymentMethod: 'card',
        autoRenew: true,
        status: 'active',
        lastUsed: this.addDays(today, -2),
        notifications: { renewal: true, unused: true }
      },
      {
        id: this.generateId(),
        platform: 'Prime',
        cost: 1499,
        billingCycle: 'yearly',
        nextRenewal: this.addDays(today, 45),
        lastPayment: this.addDays(today, -320),
        startDate: this.addMonths(today, -12),
        type: 'premium',
        paymentMethod: 'upi',
        autoRenew: true,
        status: 'active',
        lastUsed: this.addDays(today, -7),
        notifications: { renewal: true, unused: true }
      },
      {
        id: this.generateId(),
        platform: 'Hotstar',
        cost: 299,
        billingCycle: 'monthly',
        nextRenewal: this.addDays(today, 12),
        lastPayment: this.addDays(today, -18),
        startDate: this.addMonths(today, -3),
        type: 'basic',
        paymentMethod: 'wallet',
        autoRenew: true,
        status: 'active',
        lastUsed: this.addDays(today, -45),
        notifications: { renewal: true, unused: true }
      }
    ];
    this.setSubscriptions(subscriptions);
    return subscriptions;
  },

  generateId() {
    return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString();
  },

  addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result.toISOString();
  },

  getDaysRemaining(dateStr) {
    const target = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  },

  getDaysSince(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    return Math.floor((today - date) / (1000 * 60 * 60 * 24));
  },

  calculateTotalSpent(subscription) {
    const startDate = new Date(subscription.startDate);
    const today = new Date();
    const months = this.getMonthsBetween(startDate, today);
    const monthlyCost = subscription.billingCycle === 'yearly' 
      ? subscription.cost / 12 
      : subscription.cost;
    return Math.round(monthlyCost * months);
  },

  getMonthsBetween(start, end) {
    return (end.getFullYear() - start.getFullYear()) * 12 + 
           (end.getMonth() - start.getMonth());
  },

  getMonthlyEquivalent(cost, cycle) {
    return cycle === 'yearly' ? Math.round(cost / 12) : cost;
  },

  getTotalMonthlySpending() {
    const subscriptions = this.getSubscriptions().filter(s => s.status !== 'expired');
    return subscriptions.reduce((sum, sub) => {
      return sum + this.getMonthlyEquivalent(sub.cost, sub.billingCycle);
    }, 0);
  },

  getTotalYearlySpending() {
    const subscriptions = this.getSubscriptions().filter(s => s.status !== 'expired');
    return subscriptions.reduce((sum, sub) => {
      const monthly = this.getMonthlyEquivalent(sub.cost, sub.billingCycle);
      return sum + (monthly * 12);
    }, 0);
  },

  getActiveSubscriptionsCount() {
    return this.getSubscriptions().filter(s => s.status === 'active' || s.status === 'expiring').length;
  },

  getUpcomingRenewals(limit = 5) {
    const subscriptions = this.getSubscriptions()
      .filter(s => s.status !== 'expired')
      .map(s => ({
        ...s,
        daysRemaining: this.getDaysRemaining(s.nextRenewal)
      }))
      .sort((a, b) => a.daysRemaining - b.daysRemaining);
    return subscriptions.slice(0, limit);
  },

  getUnusedSubscriptions() {
    const subscriptions = this.getSubscriptions().filter(s => {
      const daysSinceUsed = this.getDaysSince(s.lastUsed);
      return daysSinceUsed > 30 && s.status !== 'expired';
    });
    return subscriptions;
  },

  updateSubscriptionStatus(subscription) {
    const daysRemaining = this.getDaysRemaining(subscription.nextRenewal);
    if (daysRemaining < 0) {
      subscription.status = 'expired';
    } else if (daysRemaining <= 7) {
      subscription.status = 'expiring';
    } else {
      subscription.status = 'active';
    }
    return subscription;
  },

  formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  },

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },

  formatDateShort(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  }
};

const Auth = {
  DEMO_EMAIL: 'demo@user.com',
  DEMO_PASSWORD: '123456',

  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === this.DEMO_EMAIL && password === this.DEMO_PASSWORD) {
          const user = {
            email: email,
            name: 'Demo User',
            createdAt: new Date().toISOString()
          };
          DataStore.setUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  signup(email, password, name) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          email,
          name: name || email.split('@')[0],
          createdAt: new Date().toISOString()
        };
        DataStore.setUser(user);
        resolve(user);
      }, 1000);
    });
  },

  logout() {
    DataStore.clearUser();
    window.location.href = 'index.html';
  },

  isAuthenticated() {
    return DataStore.getUser() !== null;
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  }
};

const UI = {
  showToast(message, type = 'success') {
    const container = document.querySelector('.toast-container') || this.createToastContainer();
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <span class="toast-message">${message}</span>
      <span class="toast-close">✕</span>
    `;
    
    container.appendChild(toast);
    
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  },

  showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner"></span> Loading...';
    button.disabled = true;
    button.dataset.originalText = originalText;
    return originalText;
  },

  hideLoading(button) {
    const originalText = button.dataset.originalText;
    if (originalText) {
      button.innerHTML = originalText;
      button.disabled = false;
    }
  },

  animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const animate = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString('en-IN');
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString('en-IN');
      }
    };
    
    animate();
  },

  getPlatformInfo(platform) {
    const platformData = DataStore.PLATFORMS[platform] || { color: '#6366f1', icon: platform[0] };
    return platformData;
  },

  createPlatformLogo(platform, size = 'md') {
    const info = this.getPlatformInfo(platform);
    const sizeClass = size === 'lg' ? 'lg' : '';
    return `<div class="platform-logo ${sizeClass}" style="background: ${info.color}">${info.icon}</div>`;
  },

  getStatusBadge(status) {
    const badges = {
      active: '<span class="badge badge-success">Active</span>',
      expiring: '<span class="badge badge-warning">Expiring Soon</span>',
      expired: '<span class="badge badge-danger">Expired</span>'
    };
    return badges[status] || badges.active;
  },

  formatCountdown(days) {
    if (days < 0) return { text: 'Expired', class: 'danger' };
    if (days === 0) return { text: 'Today', class: 'warning' };
    if (days === 1) return { text: '1 day', class: 'warning' };
    if (days <= 7) return { text: `${days} days`, class: 'warning' };
    return { text: `${days} days`, class: '' };
  },

  showModal(title, content, actions = []) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="btn btn-icon btn-ghost modal-close">✕</button>
        </div>
        <div class="modal-body">${content}</div>
        ${actions.length ? `<div class="modal-footer">${actions.join('')}</div>` : ''}
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    overlay.querySelector('.modal-close').addEventListener('click', () => {
      overlay.remove();
    });
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    
    return overlay;
  },

  confirmDelete(title, message, onConfirm) {
    const actions = [
      '<button class="btn btn-secondary modal-cancel">Cancel</button>',
      '<button class="btn btn-danger modal-confirm">Delete</button>'
    ];
    
    const modal = this.showModal(title, `<p>${message}</p>`, actions);
    
    modal.querySelector('.modal-cancel').addEventListener('click', () => modal.remove());
    modal.querySelector('.modal-confirm').addEventListener('click', () => {
      onConfirm();
      modal.remove();
    });
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

window.DataStore = DataStore;
window.Auth = Auth;
window.UI = UI;
