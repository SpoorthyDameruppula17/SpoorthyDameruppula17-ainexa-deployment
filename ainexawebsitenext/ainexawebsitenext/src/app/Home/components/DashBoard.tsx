import React from 'react';
import HorizontalBarChart from './HorizontalBarchat';
import ComboTimeChart from './ComboTime';


export default function DashboardPage() {
  return (
    <div style={{width : '100%' ,height : 500 ,flexDirection : 'row' ,display : 'flex' }}>
        <div style={{width : '45%',minHeight : 500}}>
            <HorizontalBarChart />
        </div>
        <div style={{width : '45%',minHeight : 500}}>
            <ComboTimeChart />
        </div>
    </div>
  );
}
