
import { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Cell 
} from 'recharts';
import { ChevronRight, TrendingUp, Users, DollarSign } from 'lucide-react';
import { 
  lifecycleStages, 
  performanceData, 
  playbookImpact, 
  churnSignals, 
  segmentData 
} from '../data/dashboard-data';

export default function CSMDashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedStage, setSelectedStage] = useState(null);
  const [segment, setSegment] = useState('all');

  const getSegmentKPIs = () => {
    if (segment === 'all') return null;
    return segmentData[segment];
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Customer Lifecycle Framework
        </h1>
        <p className="text-xl text-gray-600">
          I drove <span className="font-bold text-green-600">97% GRR</span> across{' '}
          <span className="font-bold text-blue-600">£8M ARR</span> using a repeatable framework
        </p>
        
        {/* Segment Filter */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setSegment('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              segment === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            All Segments
          </button>
          <button
            onClick={() => setSegment('enterprise')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              segment === 'enterprise' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Enterprise (12 accounts, £6.5M ARR)
          </button>
          <button
            onClick={() => setSegment('smb')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              segment === 'smb' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            SMB (28 accounts, £1.7M ARR)
          </button>
        </div>

        {/* Segment-Specific KPIs */}
        {segment !== 'all' && (
          <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">GRR</div>
              <div className="text-2xl font-bold text-blue-600">
                {segmentData[segment].grr}%
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">NRR</div>
              <div className="text-2xl font-bold text-green-600">
                {segmentData[segment].nrr}%
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">TTV</div>
              <div className="text-2xl font-bold text-purple-600">
                {segmentData[segment].ttv} days
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Adoption</div>
              <div className="text-2xl font-bold text-amber-600">
                {segmentData[segment].adoption}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Switcher */}
      <div className="flex justify-center gap-4 border-b pb-4">
        <button
          onClick={() => setActiveView('overview')}
          className={`px-6 py-2 font-medium transition-colors ${
            activeView === 'overview' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Lifecycle Overview
        </button>
        <button
          onClick={() => setActiveView('playbook')}
          className={`px-6 py-2 font-medium transition-colors ${
            activeView === 'playbook' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Playbook Deep-Dive
        </button>
        <button
          onClick={() => setActiveView('proof')}
          className={`px-6 py-2 font-medium transition-colors ${
            activeView === 'proof' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Proof & Metrics
        </button>
      </div>

      {/* Conditional Views */}
      {activeView === 'overview' && (
        <OverviewView stages={lifecycleStages} onStageClick={setSelectedStage} />
      )}
      {activeView === 'playbook' && (
        <PlaybookView stages={lifecycleStages} />
      )}
      {activeView === 'proof' && <ProofView />}
    </div>
  );
}

// Overview View Component
function OverviewView({ stages, onStageClick }) {
  return (
    <div className="space-y-8">
      {/* Funnel Visualization */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center w-full md:flex-1">
            <button
              onClick={() => onStageClick(stage)}
              className="w-full p-6 rounded-lg border-2 hover:shadow-lg transition-all"
              style={{ 
                borderColor: stage.color, 
                backgroundColor: `${stage.color}10` 
              }}
            >
              <div className="text-4xl mb-2">{stage.icon}</div>
              <h3 className="font-bold text-lg mb-2">{stage.name}</h3>
              <div className="space-y-2">
                {stage.kpis.map((kpi, i) => (
                  <div key={i} className="group relative">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{kpi.metric}</span>
                      <span className="font-bold">{kpi.value}</span>
                    </div>
                    <span className={`text-xs ${
                      kpi.change.startsWith('+') || kpi.change.startsWith('-') && parseFloat(kpi.change) < 0
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs p-3 rounded shadow-lg w-64 z-10">
                      {kpi.definition}
                    </div>
                  </div>
                ))}
              </div>
            </button>
            {index < stages.length - 1 && (
              <ChevronRight className="mx-2 text-gray-400 hidden md:block" size={24} />
            )}
          </div>
        ))}
      </div>

      {/* Playbook Count Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stages.map(stage => (
          <div key={stage.id} className="p-4 bg-gray-50 rounded-lg border">
            <div className="text-sm text-gray-600">{stage.name}</div>
            <div className="text-2xl font-bold">{stage.playbooks.length}</div>
            <div className="text-xs text-gray-500">playbooks</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Playbook Deep-Dive View
function PlaybookView({ stages }) {
  const [selectedStage, setSelectedStage] = useState(stages[0]);
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stage Selector */}
      <div className="space-y-2">
        <h3 className="font-bold text-lg mb-4">Select Stage</h3>
        {stages.map(stage => (
          <button
            key={stage.id}
            onClick={() => {
              setSelectedStage(stage);
              setSelectedPlaybook(null);
            }}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedStage.id === stage.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stage.icon}</span>
              <span className="font-medium text-sm">{stage.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Playbook List */}
      <div className="space-y-2">
        <h3 className="font-bold text-lg mb-4">
          Playbooks ({selectedStage.playbooks.length})
        </h3>
        {selectedStage.playbooks.map(playbook => (
          <button
            key={playbook.id}
            onClick={() => setSelectedPlaybook(playbook)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedPlaybook?.id === playbook.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium text-sm">{playbook.name}</div>
            <div className="text-xs text-gray-500 mt-1">{playbook.trigger}</div>
          </button>
        ))}
      </div>

      {/* Playbook Detail */}
      <div className="bg-gray-50 rounded-lg p-6 border">
        {selectedPlaybook ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-xl mb-2">{selectedPlaybook.name}</h3>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Trigger:</span> {selectedPlaybook.trigger}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-2">Actions</h4>
              <ol className="space-y-2">
                {selectedPlaybook.actions.map((action, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold text-blue-600 flex-shrink-0">{i + 1}.</span>
                    <span className="text-sm">{action}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">Outcome</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium">Before:</span> {selectedPlaybook.outcome.before}
                </div>
                <div>
                  <span className="font-medium">After:</span> {selectedPlaybook.outcome.after}
                </div>
                <div className="text-green-700 font-bold mt-2">
                  ✓ {selectedPlaybook.outcome.impact}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            Select a playbook to see details
          </div>
        )}
      </div>
    </div>
  );
}

// Proof & Metrics View
function ProofView() {
  return (
    <div className="space-y-8">
      {/* GRR/NRR Trend */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-bold text-lg mb-4">Revenue Retention Trend</h3>
        <p className="text-sm text-gray-600 mb-4">
          Framework implementation drove GRR from 92% → 97% and NRR from 105% → 117%
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="grr" 
              stroke="#10b981" 
              strokeWidth={3} 
              name="GRR %" 
              dot={{ fill: '#10b981', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="nrr" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              name="NRR %" 
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Playbook Impact Heatmap */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-bold text-lg mb-4">Playbook Expansion Correlation</h3>
        <p className="text-sm text-gray-600 mb-4">
          Executive engagement drives 3.2x higher expansion vs. baseline
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={playbookImpact}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="playbook" angle={-15} textAnchor="end" height={80} />
            <YAxis label={{ value: 'Expansion Multiplier', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="expansion" name="Expansion Multiplier">
              {playbookImpact.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(${120 - entry.expansion * 20}, 70%, 50%)`} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Churn Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 text-green-900">
            ✓ Risks Caught & Saved
          </h3>
          <div className="space-y-3">
            {churnSignals.caught.map((signal, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm">{signal.signal}</span>
                <span className="font-bold text-green-700">
                  {signal.saved}/{signal.count}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-green-300">
            <div className="text-sm text-green-700">
              <span className="font-bold">82% prediction accuracy</span> — caught 23/28 at-risk accounts
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 text-red-900">
            ⚠️ Missed Signals (Learnings)
          </h3>
          <div className="space-y-3">
            {churnSignals.missed.map((signal, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm">{signal.signal}</span>
                <span className="font-bold text-red-700">{signal.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-red-300">
            <div className="text-sm text-red-700">
              Now tracking these in quarterly exec reviews
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 text-blue-900">Key Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-3xl font-bold text-blue-600">£8M</div>
            <div className="text-sm text-gray-600">ARR Portfolio Managed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">£410K</div>
            <div className="text-sm text-gray-600">ARR Saved (Proactive Renewal)</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">40%</div>
            <div className="text-sm text-gray-600">Churn Win-Back Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
