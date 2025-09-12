import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TricolourChartProps {
  data: Array<{
    name: string;
    value: number;
    category?: 'won' | 'lost' | 'pending' | 'biased' | 'unbiased';
  }>;
  type?: 'bar' | 'pie';
  title?: string;
}

export const TricolourChart: React.FC<TricolourChartProps> = ({ 
  data, 
  type = 'bar', 
  title 
}) => {
  // Tricolour theme colors
  const tricolourColors = {
    saffron: '#FF9933', // Indian saffron
    white: '#FFFFFF',   // White
    green: '#138808',   // Indian green
    neutral: '#787878'  // Neutral gray
  };

  const getColorByCategory = (category?: string) => {
    switch (category) {
      case 'won':
      case 'unbiased':
        return tricolourColors.green;
      case 'lost':
      case 'biased':
        return tricolourColors.saffron;
      case 'pending':
        return tricolourColors.neutral;
      default:
        return tricolourColors.saffron;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-constitutional/20 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{label}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            Value: {payload[0].value}
            {type === 'pie' && (
              <span className="ml-2">
                ({((payload[0].value / data.reduce((acc, item) => acc + item.value, 0)) * 100).toFixed(1)}%)
              </span>
            )}
          </p>
        </div>
      );
    }
    return null;
  };

  if (type === 'pie') {
    return (
      <div className="w-full h-80">
        {title && (
          <h3 className="text-lg font-bold text-center mb-4 bg-gradient-to-r from-constitutional to-judicial bg-clip-text text-transparent">
            {title}
          </h3>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColorByCategory(entry.category)} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      {title && (
        <h3 className="text-lg font-bold text-center mb-4 bg-gradient-to-r from-constitutional to-judicial bg-clip-text text-transparent">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--constitutional) / 0.2)" 
          />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColorByCategory(entry.category)} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};