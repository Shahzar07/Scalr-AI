
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { userService } from '../services/userService';
import { 
  Users, 
  Mail, 
  LogOut, 
  Search, 
  Shield, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Ban,
  CheckCircle,
  Send,
  Trash2,
  Plus,
  X,
  User as UserIcon,
  ExternalLink,
  AlertTriangle,
  Database
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'email'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  // Email State
  const [emailMode, setEmailMode] = useState<'broadcast' | 'direct'>('broadcast');
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);

  // New User Form State
  const [newUser, setNewUser] = useState({ name: '', email: '', plan: 'Free' as 'Free'|'Pro'|'Enterprise', status: 'Active' as 'Active'|'Suspended' });

  useEffect(() => {
    setUsers(userService.getUsers());
  }, []);

  const refreshUsers = () => {
    setUsers(userService.getUsers());
  };

  // --- ACTIONS ---

  const handleUpdatePlan = (id: string, newPlan: 'Free' | 'Pro' | 'Enterprise') => {
    userService.updateUser(id, { plan: newPlan });
    refreshUsers();
  };

  const handleToggleStatus = (user: User) => {
    userService.updateUser(user.id, { status: user.status === 'Active' ? 'Suspended' : 'Active' });
    refreshUsers();
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      userService.deleteUser(id);
      refreshUsers();
    }
  };

  const handleResetDatabase = () => {
    if (window.confirm('WARNING: This will delete ALL users from the local database. This action is irreversible. Are you sure?')) {
        userService.resetDatabase();
        refreshUsers();
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    userService.addUser(newUser);
    refreshUsers();
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', plan: 'Free', status: 'Active' });
  };

  const navigateToEmailUser = (user: User) => {
    setActiveTab('email');
    setEmailMode('direct');
    setSelectedRecipientId(user.id);
    setEmailSubject(`Update regarding your account`);
    setEmailBody(`Hi ${user.name},\n\nWe wanted to reach out regarding...`);
  };

  // FUNCTIONAL EMAIL SYSTEM
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailBody);
    let link = '';

    if (emailMode === 'direct') {
        const user = users.find(u => u.id === selectedRecipientId);
        if (user && user.email) {
            link = `mailto:${user.email}?subject=${subject}&body=${body}`;
        } else {
            alert("Please select a valid recipient.");
            return;
        }
    } else {
        // Broadcast: Use BCC to email everyone at once while keeping emails private
        const activeEmails = users
            .filter(u => u.status === 'Active')
            .map(u => u.email)
            .join(',');
            
        if (activeEmails) {
            link = `mailto:?bcc=${activeEmails}&subject=${subject}&body=${body}`;
        } else {
            alert("No active users found to broadcast to.");
            return;
        }
    }

    if (link) {
        // Open in new tab to avoid disrupting app state, though mailto usually handles itself
        window.open(link, '_blank');
        
        // Show success UI
        setEmailSuccess(true);
        setTimeout(() => setEmailSuccess(false), 4000);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#0B1121] text-white flex flex-col border-r border-white/5">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
                    <Shield size={16} className="text-white" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight">Scalr <span className="text-red-500 text-xs uppercase tracking-wider ml-1">Admin</span></span>
            </div>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1">
            <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'users' ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
                <Users size={18} /> User Management
            </button>
            <button 
                onClick={() => setActiveTab('email')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'email' ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
                <Mail size={18} /> Email Center
            </button>
        </div>

        <div className="p-4 border-t border-white/5 space-y-2">
             <button onClick={handleResetDatabase} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-xs font-medium px-2 py-1.5 rounded hover:bg-red-900/20">
                <Database size={14} /> Reset Database
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium px-2 py-2">
                <LogOut size={16} /> Sign Out
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
            <h1 className="font-black text-xl text-slate-900">
                {activeTab === 'users' ? 'User Database' : 'Communication Hub'}
            </h1>
            <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-100 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> System Online
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                    AD
                </div>
            </div>
        </header>

        {/* Content Scroll */}
        <div className="flex-1 overflow-y-auto p-8">
            
            {activeTab === 'users' && (
                <div className="space-y-6">
                    {/* Toolbar */}
                    <div className="flex justify-between items-center">
                        <div className="relative w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search users by name or email..." 
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500/20 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-slate-500 font-medium">
                                Total Users: <span className="text-slate-900 font-bold">{users.length}</span>
                            </div>
                            <button 
                                onClick={() => setShowAddUserModal(true)}
                                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-black transition-colors shadow-lg shadow-slate-900/20"
                            >
                                <Plus size={16} /> Add User
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm min-h-[400px]">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Activity</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400">
                                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                                    <Users size={24} />
                                                </div>
                                                <p className="font-medium text-slate-900">No users found</p>
                                                <p className="text-sm mb-4">The database is currently empty.</p>
                                                <button 
                                                    onClick={() => setShowAddUserModal(true)}
                                                    className="text-blue-600 font-bold text-sm hover:underline"
                                                >
                                                    Add your first user
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                user.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                                                user.plan === 'Pro' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                                {user.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-600">{user.lastActive}</div>
                                            <div className="text-xs text-slate-400">Joined {user.joinedDate}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => navigateToEmailUser(user)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                    title="Message User"
                                                >
                                                    <Mail size={16} />
                                                </button>
                                                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                                                <button 
                                                    onClick={() => handleUpdatePlan(user.id, 'Enterprise')}
                                                    className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                                                    title="Upgrade to Enterprise"
                                                >
                                                    <ArrowUpCircle size={16} />
                                                </button>
                                                <button 
                                                     onClick={() => handleUpdatePlan(user.id, 'Free')}
                                                     className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                                                     title="Downgrade to Free"
                                                >
                                                    <ArrowDownCircle size={16} />
                                                </button>
                                                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                                                <button 
                                                    onClick={() => handleToggleStatus(user)}
                                                    className={`p-1.5 rounded transition-colors ${user.status === 'Active' ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50' : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'}`}
                                                    title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                                                >
                                                    {user.status === 'Active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'email' && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                        
                        {/* Sidebar */}
                        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Message Type</h3>
                            <div className="space-y-2">
                                <button 
                                    onClick={() => { setEmailMode('broadcast'); setSelectedRecipientId(''); }}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-bold transition-all ${emailMode === 'broadcast' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-200 text-slate-600'}`}
                                >
                                    <Users size={16} /> Broadcast All
                                </button>
                                <button 
                                    onClick={() => setEmailMode('direct')}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-bold transition-all ${emailMode === 'direct' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-200 text-slate-600'}`}
                                >
                                    <UserIcon size={16} /> Direct Message
                                </button>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Stats</h3>
                                <div className="space-y-3">
                                    <div className="bg-white p-3 rounded border border-slate-200">
                                        <div className="text-xs text-slate-400">Total Recipients</div>
                                        <div className="font-bold text-slate-900 text-lg">{users.filter(u => u.status === 'Active').length}</div>
                                    </div>
                                    <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                                        <div className="flex items-center gap-2 text-xs text-yellow-700 font-bold mb-1">
                                            <AlertTriangle size={12} /> Note
                                        </div>
                                        <p className="text-[10px] text-yellow-600 leading-tight">
                                            Emails are sent via your local mail client. No server required.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Composer */}
                        <div className="flex-1 p-8 flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                    <Send size={20} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg text-slate-900">
                                        {emailMode === 'broadcast' ? 'Broadcast Message' : 'Direct Message'}
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        {emailMode === 'broadcast' ? 'Send an update to all active users via BCC.' : 'Send a secure notification to a specific user.'}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSendEmail} className="space-y-6 flex-1 flex flex-col">
                                {emailMode === 'direct' && (
                                     <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recipient</label>
                                        <select 
                                            value={selectedRecipientId}
                                            onChange={(e) => setSelectedRecipientId(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
                                            required
                                        >
                                            <option value="">Select a user...</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subject Line</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none font-medium"
                                        placeholder={emailMode === 'broadcast' ? "Important Update: Scalr v2.0 is live..." : "Regarding your account..."}
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message Body</label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none resize-none flex-1"
                                        placeholder="Write your update here..."
                                        value={emailBody}
                                        onChange={(e) => setEmailBody(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <div className="text-xs text-slate-400">
                                        {emailMode === 'broadcast' 
                                            ? `Will open mail client with ${users.filter(u => u.status === 'Active').length} BCC recipients.` 
                                            : 'Will open mail client with direct recipient.'}
                                    </div>
                                    <button 
                                        type="submit"
                                        className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-black transition-all flex items-center gap-2 ml-auto shadow-lg"
                                    >
                                        Open Mail Client <ExternalLink size={16} />
                                    </button>
                                </div>
                            </form>

                            {emailSuccess && (
                                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold rounded-lg flex items-center gap-2 animate-fade-in">
                                    <CheckCircle size={18} /> Email client opened with draft.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
      </main>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-900">Add New User</h3>
                    <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>
                <form onSubmit={handleAddUser} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Full Name</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            value={newUser.name}
                            onChange={e => setNewUser({...newUser, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Email</label>
                        <input 
                            type="email" 
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            value={newUser.email}
                            onChange={e => setNewUser({...newUser, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Initial Plan</label>
                        <select 
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            value={newUser.plan}
                            onChange={e => setNewUser({...newUser, plan: e.target.value as any})}
                        >
                            <option value="Free">Free Tier</option>
                            <option value="Pro">Pro Plan</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 transition-colors"
                    >
                        Create User Account
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
