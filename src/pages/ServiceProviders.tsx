import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { 
  Search, Filter, MoreVertical, CheckCircle, XCircle, 
  Bell, Flag, Trash2, Edit3, ExternalLink 
} from 'lucide-react';
import { Card, AreaChart, Title, DonutChart } from '@tremor/react';
import { auth } from './auth';
interface Provider {
  id: string;
  name: string;
  email: string;
  active : boolean
  status: 'verified' | 'pending' | 'rejected';
  services: string[];
  rating: number;
  joinedDate: string;
  completedJobs: number;
  verificationDocuments: string[];
}

const ServiceProviders = () => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [view, setView] = useState<'list' | 'profile'>('list');
  
  const [providers,setProviders] = useState([]);
    useEffect(() => {
        const fetch = async ()=>{
            try {
                const response = await axios.get("https://backend-82hj.onrender.com/api/v1/admin/providers/?page=1&pageSize=10",
                    {
                        headers : {
                            Authorization: auth
                        }   
                    }
                )
                setProviders(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetch()
        console.log("hii" +providers)
    },[])


  const performanceData = [
    { date: '2024-01', completed: 25, cancelled: 2 },
    { date: '2024-02', completed: 30, cancelled: 1 },
    { date: '2024-03', completed: 35, cancelled: 3 },
  ];

  const statusColors = {
    verified: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const ProviderList = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Service Providers</h2>
          <div className="flex space-x-3">
            <button className="btn-primary">Add Provider</button>
            <button className="btn-secondary flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Send Notification
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search providers..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:border-[#00C8C8]"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select className="input-primary">
              <option>Status: All</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            <button className="btn-secondary flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers.map((provider:any) => (
              <tr key={provider.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-[#00C8C8] flex items-center justify-center text-white font-medium">
                        {provider.fullname.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{provider.fullname}</div>
                      <div className="text-sm text-gray-500">{provider.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors.verified}`}>
                    {""+provider.active}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {provider.services.map((service:any) => (
                      <span key={service.id} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                        {/* {service.service.service_name} */}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{provider.rating}</span>
                    <div className="ml-2 flex text-yellow-400">
                      {'★'.repeat(Math.floor(3+Math.random()*2))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(provider.dateApproved).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => {
                        setSelectedProvider(provider);
                        setView('profile');
                      }}
                      className="text-[#00C8C8] hover:text-[#00B4B4]"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to 20 of 100 entries
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-[#00C8C8] text-white rounded-md">1</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProviderProfile = () => {
    if (!selectedProvider) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setView('list')}
            className="btn-secondary"
          >
            Back to List
          </button>
          <div className="flex space-x-3">
            <button className="btn-secondary flex items-center">
              <Flag className="w-4 h-4 mr-2" />
              Flag Provider
            </button>
            <button className="btn-primary flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Verify Provider
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedProvider.name}</h2>
                  <p className="text-gray-500">{selectedProvider.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedProvider.status]}`}>
                  {selectedProvider.status}
                </span>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedProvider.rating}</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedProvider.completedJobs}</div>
                  <div className="text-sm text-gray-500">Completed Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedProvider.services.length}</div>
                  <div className="text-sm text-gray-500">Services</div>
                </div>
              </div>
            </Card>

            <Card>
              <Title>Performance Overview</Title>
              <AreaChart
                className="h-72 mt-4"
                data={performanceData}
                index="date"
                categories={['completed', 'cancelled']}
                colors={['cyan', 'red']}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <Title>Service Distribution</Title>
              <DonutChart
                className="h-48 mt-4"
                data={[
                  { name: 'Plumbing', value: 65 },
                  { name: 'Electrical', value: 35 },
                ]}
                category="value"
                index="name"
                colors={['cyan', 'blue']}
              />
            </Card>

            <Card>
              <Title>Verification Documents</Title>
              <div className="mt-4 space-y-3">
                {selectedProvider.verificationDocuments.map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{doc}</span>
                    <button className="text-[#00C8C8]">View</button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {view === 'list' ? <ProviderList /> : <ProviderProfile />}
    </div>
  );
};

export default ServiceProviders;