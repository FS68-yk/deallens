import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useLanguage } from '../../context/LanguageContext';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface HexagonChartProps {
  data: {
    teamScore: number;
    productScore: number;
    marketScore: number;
    financialScore: number;
    tractonScore: number;
    socialScore: number;
  };
}

const HexagonChart: React.FC<HexagonChartProps> = ({ data }) => {
  const { language } = useLanguage();
  const chartRef = useRef<ChartJS>(null);

  // 准备图表数据
  const chartData = {
    labels: [
      language === 'zh' ? '团队能力' : 'Team',
      language === 'zh' ? '产品/技术' : 'Product/Tech',
      language === 'zh' ? '市场潜力' : 'Market',
      language === 'zh' ? '财务健康' : 'Financial',
      language === 'zh' ? '增长牵引力' : 'Traction',
      language === 'zh' ? '社交影响力' : 'Social'
    ],
    datasets: [
      {
        label: language === 'zh' ? '项目评分' : 'Project Score',
        data: [
          data.teamScore,
          data.productScore,
          data.marketScore,
          data.financialScore,
          data.tractonScore,
          data.socialScore
        ],
        backgroundColor: 'rgba(48, 77, 130, 0.2)',
        borderColor: 'rgba(48, 77, 130, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: '#304D82',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#304D82',
        pointRadius: 4
      }
    ]
  };

  // 图表配置
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
          font: {
            size: 8 // 更小的刻度字体
          },
          callback: (value: number) => `${value}%`
        },
        pointLabels: {
          font: {
            size: window.innerWidth < 768 ? 8 : 11, // 移动端更小的字体
            weight: '500',
          },
          padding: window.innerWidth < 768 ? 5 : 10, // 移动端减少内边距
          color: '#304D82'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`
        }
      }
    },
    maintainAspectRatio: false, // 允许灵活调整大小
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      }
    },
    responsive: true
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="w-full max-w-md mx-auto" style={{ height: window.innerWidth < 768 ? '220px' : '280px' }}>
        <Radar data={chartData} options={options} />
      </div>
      
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-2 sm:mt-4 text-center">
        <div>
          <div className="text-base sm:text-lg font-semibold text-primary-700">{Math.round((data.teamScore + data.productScore + data.marketScore + data.financialScore + data.tractonScore + data.socialScore) / 6)}%</div>
          <div className="text-xs text-gray-600">{language === 'zh' ? '综合评分' : 'Overall Score'}</div>
        </div>
        <div>
          <div className="text-base sm:text-lg font-semibold text-success-600">{data.marketScore}%</div>
          <div className="text-xs text-gray-600">{language === 'zh' ? '最高分项' : 'Highest Score'}</div>
        </div>
        <div>
          <div className="text-base sm:text-lg font-semibold text-warning-600">{data.socialScore}%</div>
          <div className="text-xs text-gray-600">{language === 'zh' ? '建议改进' : 'Improvement Area'}</div>
        </div>
      </div>
    </div>
  );
};

export default HexagonChart;