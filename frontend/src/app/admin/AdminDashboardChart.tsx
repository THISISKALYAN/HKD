"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface AdminDashboardChartProps {
  contentData: any[];
}

export default function AdminDashboardChart({ contentData }: AdminDashboardChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={contentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
        <defs>
          <pattern id="stripes" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#8b9b82" strokeWidth="3" />
          </pattern>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b9b82', fontWeight: 600 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b9b82', fontWeight: 600 }} dx={-10} />
        <Tooltip 
          cursor={{fill: 'rgba(249,250,251,0.5)'}} 
          contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', color: '#111827', fontWeight: 600, fontSize: '12px' }} 
        />
        <Bar dataKey="Hero" fill="#76bb76" radius={[50, 50, 50, 50]} barSize={40} />
        <Bar dataKey="Temple" fill="#274724" radius={[50, 50, 50, 50]} barSize={40} />
        <Bar dataKey="Darshan" fill="url(#stripes)" radius={[50, 50, 50, 50]} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
