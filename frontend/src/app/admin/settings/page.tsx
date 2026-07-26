"use client";

import React, { useEffect, useState } from 'react';
import { useCms } from '@/components/CmsContext';
import { Loader2, Plus, Edit, Trash2, Shield, User, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from '@/lib/axios';

type Staff = {
 id: string;
 name: string;
 email: string;
 role: string;
 phone: string;
 isActive: boolean;
 permissions: string[];
};

const MODULES = [
 { id: 'home', label: 'Homepage' },
 { id: 'daily-darshan', label: 'Daily Darshan' },
 { id: 'folk-gallery', label: 'Folk Gallery' },
 { id: 'reels', label: 'HKM Reels' },
 { id: 'leads', label: 'Inquiries' },
 { id: 'blogs', label: 'Blogs' },
];

export default function SettingsPage() {
 const { token, user, role } = useCms();
 const [activeTab, setActiveTab] = useState<'profile' | 'staff'>('profile');
 
 // Profile State
 const [oldPassword, setOldPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });
 const [savingProfile, setSavingProfile] = useState(false);

 // Staff State
 const [staffList, setStaffList] = useState<Staff[]>([]);
 const [loadingStaff, setLoadingStaff] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
 
 // Form State
 const [formData, setFormData] = useState({
 name: '',
 email: '',
 phone: '',
 password: '',
 role: 'staff',
 isActive: true,
 permissions: [] as string[]
 });
 const [savingStaff, setSavingStaff] = useState(false);
 const [staffMsg, setStaffMsg] = useState({ text: '', type: '' });



 const fetchStaff = React.useCallback(async () => {
 setLoadingStaff(true);
 try {
 const res = await axios.get('/api/cms/users', { headers: { Authorization: `Bearer ${token}` } });
 setStaffList(res.data);
 } catch (err) {
 console.error(err);
 } finally {
 setLoadingStaff(false);
 }
 }, [token]);

 useEffect(() => {
    if (activeTab === 'staff' && role === 'superadmin' && token) {
      fetchStaff();
    }
  }, [activeTab, role, token, fetchStaff]);


 const handlePasswordChange = async (e: React.FormEvent) => {
 e.preventDefault();
 setSavingProfile(true);
 setProfileMsg({ text: '', type: '' });
 try {
 await axios.post('/api/cms/users/change-password', { oldPassword, newPassword }, {
 headers: { Authorization: `Bearer ${token}` }
 });
 setProfileMsg({ text: 'Password updated successfully.', type: 'success' });
 setOldPassword('');
 setNewPassword('');
 } catch (err: any) {
 setProfileMsg({ text: err.response?.data?.error || 'Failed to update password.', type: 'error' });
 } finally {
 setSavingProfile(false);
 }
 };

 const openAddModal = () => {
 setEditingStaff(null);
 setFormData({ name: '', email: '', phone: '', password: '', role: 'staff', isActive: true, permissions: [] });
 setIsModalOpen(true);
 };

 const openEditModal = (staff: Staff) => {
 setEditingStaff(staff);
 setFormData({ 
 name: staff.name, 
 email: staff.email, 
 phone: staff.phone || '', 
 password: '', // Leave blank unless changing
 role: staff.role, 
 isActive: staff.isActive, 
 permissions: staff.permissions || [] 
 });
 setIsModalOpen(true);
 };

 const togglePermission = (moduleId: string) => {
 setFormData(prev => ({
 ...prev,
 permissions: prev.permissions.includes(moduleId)
 ? prev.permissions.filter(p => p !== moduleId)
 : [...prev.permissions, moduleId]
 }));
 };

 const saveStaff = async (e: React.FormEvent) => {
 e.preventDefault();
 setSavingStaff(true);
 setStaffMsg({ text: '', type: '' });
 try {
 if (editingStaff) {
 const payload: any = { ...formData };
 if (!payload.password) delete payload.password; // don't update if blank
 await axios.put(`/api/cms/users/${editingStaff.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
 } else {
 await axios.post('/api/cms/users', formData, { headers: { Authorization: `Bearer ${token}` } });
 }
 setIsModalOpen(false);
 fetchStaff();
 } catch (err: any) {
 setStaffMsg({ text: err.response?.data?.error || 'Failed to save user.', type: 'error' });
 } finally {
 setSavingStaff(false);
 }
 };

 const deleteStaff = async (id: string) => {
 if (!confirm('Are you sure you want to delete this user?')) return;
 try {
 await axios.delete(`/api/cms/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
 fetchStaff();
 } catch (err) {
 alert('Failed to delete user.');
 }
 };

 return (
 <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pb-20 font-sans pt-4">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
 <div>
 <h1 className="text-2xl font-black text-gray-900 tracking-tight">Settings</h1>
 <p className="text-sm font-medium text-gray-900 mt-1">Manage your account and staff users.</p>
 </div>
 </div>
 
 {/* Tabs */}
 <div className="flex gap-2 border-b border-gray-200/50 mb-8 overflow-x-auto custom-scrollbar pb-1">
 <button
 className={`px-4 py-2 text-sm font-bold transition-all rounded-[12px] flex items-center gap-2 ${activeTab === 'profile' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'}`}
 onClick={() => setActiveTab('profile')}
 >
 <User className="w-4 h-4" /> My Profile
 </button>
 {role === 'superadmin' && (
 <button
 className={`px-4 py-2 text-sm font-bold transition-all rounded-[12px] flex items-center gap-2 ${activeTab === 'staff' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'}`}
 onClick={() => setActiveTab('staff')}
 >
 <Shield className="w-4 h-4" /> Manage Staff Users
 </button>
 )}
 </div>

 {activeTab === 'profile' && (
 <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] p-8 max-w-2xl">
 <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-200/50 ">
 <div className="w-20 h-20 rounded-[20px] bg-indigo-50/80 flex items-center justify-center border border-indigo-100 shadow-sm">
 <User className="w-10 h-10 text-indigo-600 " />
 </div>
 <div>
 <h2 className="text-xl font-black text-gray-900 ">{user?.name}</h2>
 <p className="text-sm font-medium text-gray-900 mt-1">{user?.email}</p>
 <span className="inline-block mt-3 px-3 py-1.5 bg-gray-100/80 text-gray-900 text-xs font-bold uppercase tracking-wider rounded-[8px] border border-gray-200/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]">
 {user?.role}
 </span>
 </div>
 </div>

 <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-3">
 <div className="p-2 bg-gray-100 rounded-[10px]">
 <Lock className="w-4 h-4 text-gray-900 " />
 </div>
 Change Password
 </h3>
 <form onSubmit={handlePasswordChange} className="space-y-5">
 <div>
 <label className="block text-sm font-bold text-gray-900 mb-2">Current Password</label>
 <input 
 type="password" 
 required
 value={oldPassword}
 onChange={e => setOldPassword(e.target.value)}
 className="w-full px-4 py-3 bg-white border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[16px] focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all text-gray-900 " 
 />
 </div>
 <div>
 <label className="block text-sm font-bold text-gray-900 mb-2">New Password (Min 8 chars)</label>
 <input 
 type="password" 
 required
 minLength={8}
 value={newPassword}
 onChange={e => setNewPassword(e.target.value)}
 className="w-full px-4 py-3 bg-white border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[16px] focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all text-gray-900 " 
 />
 </div>
 
 {profileMsg.text && (
 <div className={`p-4 rounded-[12px] text-sm flex items-center gap-3 border shadow-sm ${profileMsg.type === 'success' ? 'bg-green-50/80 text-green-700 border-green-200/50' : 'bg-red-50/80 text-red-600 border-red-200/50'}`}>
 {profileMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
 <span className="font-bold">{profileMsg.text}</span>
 </div>
 )}

 <button disabled={savingProfile} type="submit" className="flex items-center justify-center w-full gap-2 bg-gray-900 text-white shadow-sm hover:bg-gray-800 transition-all transition-all rounded-[12px] px-6 py-3.5 text-sm font-bold disabled">
 {savingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
 Update Password
 </button>
 </form>
 </div>
 )}

 {activeTab === 'staff' && role === 'superadmin' && (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-[20px] border border-gray-200 ">
 <p className="text-sm font-bold text-gray-900 pl-2">Manage access and roles for administrative staff.</p>
 <button onClick={openAddModal} className="flex items-center gap-2 bg-gray-900 text-white shadow-sm hover:bg-gray-800 transition-all transition-all rounded-[12px] px-6 py-2.5 text-sm font-bold">
 <Plus className="w-4 h-4" />
 Add User
 </button>
 </div>

 <div className="bg-white border border-gray-200 shadow-sm rounded-[24px] overflow-hidden">
 {loadingStaff ? (
 <div className="p-16 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-gray-900" /></div>
 ) : (
 <div className="w-full overflow-x-auto">
 <table className="w-full text-left text-sm whitespace-nowrap">
 <thead className="bg-white border-b border-gray-100/50 ">
 <tr>
 <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Name & Email</th>
 <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Role</th>
 <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
 <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100/30 ">
 {staffList.map(staff => (
 <tr key={staff.id} className="hover:bg-gray-50 transition-colors group">
 <td className="px-8 py-5">
 <p className="font-bold text-gray-900 mb-0.5">{staff.name}</p>
 <p className="text-gray-900 font-medium text-xs">{staff.email}</p>
 </td>
 <td className="px-6 py-5">
 <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider border ${staff.role === 'superadmin' ? 'bg-purple-50 text-purple-700 border-purple-100 ' : 'bg-blue-50 text-blue-700 border-blue-100 '}`}>
 {staff.role === 'superadmin' ? <Shield className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
 {staff.role}
 </span>
 </td>
 <td className="px-6 py-5">
 <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[10px] font-bold uppercase tracking-wider border ${staff.isActive ? 'bg-green-50 text-green-700 border-green-100 ' : 'bg-red-50 text-red-700 border-red-100 '}`}>
 <div className={`w-1.5 h-1.5 rounded-full ${staff.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
 {staff.isActive ? 'Active' : 'Inactive'}
 </span>
 </td>
 <td className="px-8 py-5 text-right">
 <div className="flex items-center justify-end gap-3">
 <button onClick={() => openEditModal(staff)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-[10px] transition-all bg-gray-50/50 border border-gray-200/50 ">
 <Edit className="w-4 h-4" />
 </button>
 <button onClick={() => deleteStaff(staff.id)} className="p-2 text-gray-400 hover:bg-red-50 text-red-600 rounded-[10px] transition-all disabled:opacity-50 bg-gray-50/50 border border-gray-200/50 " disabled={staff.id === 'admin_initial'}>
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>
 </div>
 )}

 {/* Staff Modal */}
 {isModalOpen && (
 <div className="fixed inset-0 bg-gray-900/40 z-[999999] flex items-center justify-center p-4 overflow-y-auto">
 <div className="bg-white border border-gray-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[32px] w-full max-w-xl my-8 relative transform transition-all max-h-[90vh] overflow-y-auto">
 <div className="p-8 border-b border-gray-200/50 ">
 <h2 className="text-2xl font-black text-gray-900 tracking-tight">{editingStaff ? 'Edit User' : 'Create New User'}</h2>
 </div>
 
 <form onSubmit={saveStaff} className="p-8 space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div>
 <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
 <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all" />
 </div>
 <div>
 <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
 <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all disabled" disabled={!!editingStaff} />
 </div>
 <div>
 <label className="block text-sm font-bold text-gray-900 mb-2">Phone</label>
 <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all" />
 </div>
 <div>
 <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center justify-between">
 Password 
 {editingStaff && <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Optional</span>}
 </label>
 <input required={!editingStaff} type="password" minLength={8} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none text-sm font-medium transition-all" placeholder={editingStaff ? "Leave blank to keep current" : ""} />
 </div>
 </div>

 <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-5 bg-gray-50/80 rounded-[16px] border border-gray-200/50 shadow-sm">
 <label className="flex items-center gap-3 cursor-pointer group">
 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.role === 'staff' ? 'border-gray-900 bg-gray-900' : 'border-gray-300 group-hover:border-gray-900'}`}>
 {formData.role === 'staff' && <div className="w-2 h-2 bg-white rounded-full"></div>}
 </div>
 <input type="radio" name="role" value="staff" checked={formData.role === 'staff'} onChange={e => setFormData({...formData, role: 'staff'})} className="hidden" />
 <span className="text-sm font-bold text-gray-900 ">Staff Admin</span>
 </label>
 
 <label className="flex items-center gap-3 cursor-pointer group">
 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.role === 'superadmin' ? 'border-purple-600 bg-purple-600' : 'border-gray-300 group-hover'}`}>
 {formData.role === 'superadmin' && <div className="w-2 h-2 bg-white rounded-full"></div>}
 </div>
 <input type="radio" name="role" value="superadmin" checked={formData.role === 'superadmin'} onChange={e => setFormData({...formData, role: 'superadmin'})} className="hidden" />
 <span className="text-sm font-bold text-purple-700 ">Super Admin</span>
 </label>
 
 <label className="mt-4 sm:mt-0 flex items-center gap-3 cursor-pointer group">
 <div className={`w-10 h-5 rounded-full p-1 flex items-center transition-colors ${formData.isActive ? 'bg-gray-900' : 'bg-gray-300 '}`}>
 <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${formData.isActive ? 'translate-x-5' : 'translate-x-0'}`}></div>
 </div>
 <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="hidden" />
 <span className="text-sm font-bold text-gray-900 ">Account Active</span>
 </label>
 </div>

 {formData.role === 'staff' && (
 <div className="pt-2">
 <label className="block text-sm font-black text-gray-900 mb-4">Module Permissions</label>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {MODULES.map(mod => (
 <label key={mod.id} className={`flex items-center gap-4 p-4 rounded-[12px] border cursor-pointer transition-all shadow-sm ${formData.permissions.includes(mod.id) ? 'border-gray-900 bg-gray-900/5' : 'border-gray-200/80 hover:bg-gray-50'}`}>
 <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${formData.permissions.includes(mod.id) ? 'bg-gray-900 border-gray-900' : 'border-gray-300 bg-white '}`}>
 {formData.permissions.includes(mod.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
 </div>
 <input type="checkbox" checked={formData.permissions.includes(mod.id)} onChange={() => togglePermission(mod.id)} className="hidden" />
 <span className={`text-sm font-bold ${formData.permissions.includes(mod.id) ? 'text-gray-900 ]' : 'text-gray-900 '}`}>{mod.label}</span>
 </label>
 ))}
 </div>
 </div>
 )}

 {staffMsg.text && (
 <div className="p-4 bg-red-50/80 border border-red-200/50 text-red-600 rounded-[12px] text-sm flex items-center gap-3 font-bold shadow-sm">
 <AlertCircle className="w-5 h-5" />
 {staffMsg.text}
 </div>
 )}

 <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-8 border-t border-gray-200/50 ">
 <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-[12px] font-bold text-gray-900 bg-gray-100/80 hover:bg-gray-50 transition-colors w-full sm:w-auto text-center shadow-sm">
 Cancel
 </button>
 <button type="submit" disabled={savingStaff} className="flex items-center justify-center gap-2 bg-gray-900 text-white shadow-sm hover:bg-gray-800 transition-all transition-all rounded-[12px] px-8 py-3 font-bold disabled w-full sm:w-auto">
 {savingStaff && <Loader2 className="w-4 h-4 animate-spin" />}
 Save User
 </button>
 </div>
 </form>
 </div>
 </div>
 )}
 </div>
 );
}
