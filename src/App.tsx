import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Link2, 
  File, 
  Calendar, 
  Type, 
  Hash,
  Copy,
  RefreshCw,
  Shield,
  Globe,
  FileCode,
  Database,
  Lock,
  Server,
  Terminal
} from 'lucide-react';

interface DorkOption {
  operator: string;
  description: string;
  example?: string;
  value: string;
}

function App() {
  const [query, setQuery] = useState('');
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [customValue, setCustomValue] = useState('');
  const [showExample, setShowExample] = useState<string | null>(null);

  const dorkCategories = {
    basicSearch: [
      { operator: 'site:', description: 'Search within a specific domain', example: 'site:github.com hacking', value: '' },
      { operator: 'inurl:', description: 'Search for URL containing specific text', example: 'inurl:admin', value: '' },
      { operator: 'allinurl:', description: 'URLs containing all specified terms', example: 'allinurl:admin login', value: '' },
      { operator: 'inbody:', description: 'Search for text within the body of a page', example: 'inbody:password', value: '' },
      { operator: 'intitle:', description: 'Search for pages with specific title', example: 'intitle:"Index of /"', value: '' },
      { operator: 'allintitle:', description: 'Title containing all specified terms', example: 'allintitle:admin dashboard', value: '' },
      { operator: 'intext:', description: 'Search within page text', example: 'intext:"password"', value: '' },
      { operator: 'allintext:', description: 'Text containing all specified terms', example: 'allintext:username password', value: '' },
    ],
    fileSearch: [
      { operator: 'filetype:', description: 'Search for specific file types', example: 'filetype:pdf "confidential"', value: '' },
      { operator: 'ext:', description: 'File extension', example: 'ext:php inurl:admin', value: '' },
      { operator: 'cache:', description: 'View Google\'s cached version', example: 'cache:example.com', value: '' },
    ],
    security: [
      { operator: 'inurl:admin', description: 'Find admin panels', example: 'inurl:admin intitle:login', value: '' },
      { operator: 'inurl:login', description: 'Find login pages', example: 'inurl:login filetype:php', value: '' },
      { operator: 'inurl:backup', description: 'Find backup files', example: 'inurl:backup filetype:sql', value: '' },
      { operator: 'inurl:wp-content', description: 'WordPress content directory', example: 'inurl:wp-content/uploads', value: '' },
      { operator: 'inurl:phpinfo', description: 'Find phpinfo() pages', example: 'inurl:phpinfo.php', value: '' },
    ],
    exposedData: [
      { operator: 'intitle:"Index of /"', description: 'Directory listings', example: 'intitle:"Index of /admin"', value: '' },
      { operator: 'inurl:config', description: 'Configuration files', example: 'inurl:config.php', value: '' },
      { operator: 'filetype:env', description: 'Environment files', example: 'filetype:env DB_PASSWORD', value: '' },
      { operator: 'filetype:log', description: 'Log files', example: 'filetype:log username', value: '' },
      { operator: 'intext:"sql syntax near"', description: 'SQL error messages', example: 'intext:"sql syntax near" intext:warning', value: '' },
    ],
    filters: [
      { operator: 'before:', description: 'Results before date (YYYY-MM-DD)', example: 'before:2023-01-01', value: '' },
      { operator: 'after:', description: 'Results after date (YYYY-MM-DD)', example: 'after:2023-01-01', value: '' },
      { operator: '-', description: 'Exclude terms', example: '-wordpress', value: '' },
      { operator: 'OR', description: 'Match either term', example: 'admin OR administrator', value: '' },
      { operator: 'AND', description: 'Match both terms', example: 'security AND vulnerability', value: '' },
      { operator: '"exact phrase"', description: 'Match exact phrase', example: '"secret key"', value: '' },
    ],
    advanced: [
      { operator: 'related:', description: 'Find related websites', example: 'related:github.com', value: '' },
      { operator: 'link:', description: 'Find pages linking to URL', example: 'link:example.com', value: '' },
      { operator: 'info:', description: 'Information about URL', example: 'info:example.com', value: '' },
      { operator: 'location:', description: 'Search specific location', example: 'location:"San Francisco"', value: '' },
      { operator: 'define:', description: 'Show definition', example: 'define:cybersecurity', value: '' },
    ]
  };

  const handleAddOperator = (operator: string) => {
    if (!selectedOperators.includes(operator)) {
      setSelectedOperators([...selectedOperators, operator]);
    }
  };

  const handleRemoveOperator = (operator: string) => {
    setSelectedOperators(selectedOperators.filter(op => op !== operator));
  };

  const buildDorkQuery = () => {
    let dorkQuery = selectedOperators.map(op => `${op}${customValue}`).join(' ');
    if (query) {
      dorkQuery = `${dorkQuery} ${query}`;
    }
    return dorkQuery.trim();
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(buildDorkQuery());
  };

  const handleReset = () => {
    setQuery('');
    setSelectedOperators([]);
    setCustomValue('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basicSearch':
        return <Search className="w-5 h-5" />;
      case 'fileSearch':
        return <FileCode className="w-5 h-5" />;
      case 'security':
        return <Shield className="w-5 h-5" />;
      case 'exposedData':
        return <Database className="w-5 h-5" />;
      case 'filters':
        return <FileText className="w-5 h-5" />;
      case 'advanced':
        return <Terminal className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'basicSearch':
        return 'Basic Search';
      case 'fileSearch':
        return 'File Search';
      case 'security':
        return 'Security';
      case 'exposedData':
        return 'Exposed Data';
      case 'filters':
        return 'Filters';
      case 'advanced':
        return 'Advanced';
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            dorkster
          </h1>
          <p className="text-gray-400">
            Create powerful search queries with this comprehensive Google Dork builder
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {Object.entries(dorkCategories).map(([category, operators]) => (
            <div key={category} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                {getCategoryIcon(category)}
                <h2 className="text-xl font-semibold">{getCategoryTitle(category)}</h2>
              </div>
              <div className="space-y-3">
                {operators.map((op) => (
                  <div key={op.operator} className="relative">
                    <button
                      onClick={() => handleAddOperator(op.operator)}
                      onMouseEnter={() => setShowExample(op.operator)}
                      onMouseLeave={() => setShowExample(null)}
                      className="w-full text-left p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <div className="font-mono text-blue-400">{op.operator}</div>
                      <div className="text-sm text-gray-400">{op.description}</div>
                    </button>
                    {showExample === op.operator && op.example && (
                      <div className="absolute z-10 left-0 right-0 mt-1 p-3 rounded bg-gray-900 border border-gray-700 shadow-lg">
                        <div className="text-sm text-gray-300">
                          <span className="text-gray-500">Example:</span> {op.example}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold mb-4">Query Builder</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Selected Operators</label>
              <div className="flex flex-wrap gap-2">
                {selectedOperators.map((op) => (
                  <span
                    key={op}
                    className="px-3 py-1 rounded-full bg-blue-500 text-white flex items-center gap-2"
                  >
                    {op}
                    <button
                      onClick={() => handleRemoveOperator(op)}
                      className="hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Operator Value</label>
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter value for selected operators"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Search Terms</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter additional search terms"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Generated Dorkster Query</h3>
          </div>
          <div className="space-x-2 mb-4 flex justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleCopyQuery}
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
          <div className="p-4 rounded bg-gray-900 font-mono text-green-400 break-all">
            {buildDorkQuery() || 'Your query will appear here'}
          </div>
          {buildDorkQuery() && (
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(buildDorkQuery())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-6 py-3 rounded bg-purple-500 hover:bg-purple-600 transition-colors flex items-center gap-2 w-full justify-center"
            >
              <Search className="w-4 h-4" />
              Search
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
