
import { FarmStats as FarmStatsType } from '@/utils/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FarmStatsProps {
  stats: FarmStatsType[];
}

const FarmStats = ({ stats }: FarmStatsProps) => {
  // Format date for display
  const formattedStats = stats.map(stat => ({
    ...stat,
    formattedDate: new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));
  
  return (
    <Card className="bg-card/50 border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-heading">Farming Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedStats}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fill: '#F5F5F5' }} 
                stroke="rgba(255,255,255,0.3)" 
              />
              <YAxis tick={{ fill: '#F5F5F5' }} stroke="rgba(255,255,255,0.3)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 26, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#F5F5F5'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="progress" 
                name="Progress %" 
                stroke="#34C759" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="pointsEarned" 
                name="Points Earned" 
                stroke="#ea384c" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmStats;
