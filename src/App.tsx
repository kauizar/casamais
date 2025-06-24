import React, { useState } from 'react';
import { Phone, MapPin, Instagram, MessageCircle, User, Package, Calendar, CheckCircle, X, Plus, AlertTriangle } from 'lucide-react';

type Vendor = 'Felipe' | 'João' | 'Kauan' | 'Rodrigo' | 'Guilherme';

interface Delivery {
  id: string;
  clientName: string;
  clientPhone: string;
  product: string;
  observation?: string;
  address: string;
  deliveryDate: string;
  registrationDate: string;
  vendor: Vendor;
  status: 'pending' | 'completed' | 'cancelled';
}

interface MissingItem {
  id: string;
  item: string;
  vendor: Vendor;
  date: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'vendor-login' | 'vendor-area' | 'new-delivery' | 'missing-items'>('home');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: '1',
      clientName: 'Maria Silva',
      clientPhone: '13 99999-9999',
      product: 'Cimento 50kg - 10 sacos',
      observation: 'Entregar até 18h',
      address: 'Rua das Flores, 123 - Centro',
      deliveryDate: '2025-01-20',
      registrationDate: '2025-01-15',
      vendor: 'Felipe',
      status: 'pending'
    },
    {
      id: '2',
      clientName: 'João Santos',
      clientPhone: '13 88888-8888',
      product: 'Tinta Suvinil 18L - Branca',
      address: 'Av. Brasil, 456 - Vila Nova',
      deliveryDate: '2025-01-21',
      registrationDate: '2025-01-16',
      vendor: 'João',
      status: 'completed'
    }
  ]);
  const [missingItems, setMissingItems] = useState<MissingItem[]>([
    {
      id: '1',
      item: 'Parafusos 6x40mm',
      vendor: 'Felipe',
      date: '2025-01-15'
    }
  ]);

  const [newDelivery, setNewDelivery] = useState({
    clientName: '',
    clientPhone: '',
    product: '',
    observation: '',
    address: '',
    deliveryDate: ''
  });

  const [newMissingItem, setNewMissingItem] = useState('');

  const brands = [
    'Starret', 'Quartzolit', 'Hydronorth', 'Suvinil', 
    'Irwin', 'Tramontina', 'Astra', 'Votoran', 'Cauê'
  ];

  const vendors: Vendor[] = ['Felipe', 'João', 'Kauan', 'Rodrigo', 'Guilherme'];

  const handleVendorLogin = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setCurrentPage('vendor-area');
  };

  const handleNewDelivery = () => {
    if (!selectedVendor) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    const delivery: Delivery = {
      id: Date.now().toString(),
      ...newDelivery,
      registrationDate: today,
      vendor: selectedVendor,
      status: 'pending'
    };
    
    setDeliveries([...deliveries, delivery]);
    setNewDelivery({
      clientName: '',
      clientPhone: '',
      product: '',
      observation: '',
      address: '',
      deliveryDate: ''
    });
    setCurrentPage('vendor-area');
  };

  const handleCancelDelivery = (id: string) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: 'cancelled' as const } : d
    ));
  };

  const handleCompleteDelivery = (id: string) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: 'completed' as const } : d
    ));
  };

  const handleAddMissingItem = () => {
    if (!selectedVendor || !newMissingItem.trim()) return;
    
    const item: MissingItem = {
      id: Date.now().toString(),
      item: newMissingItem,
      vendor: selectedVendor,
      date: new Date().toISOString().split('T')[0]
    };
    
    setMissingItems([...missingItems, item]);
    setNewMissingItem('');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/5513933034700', '_blank');
  };

  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gray-800">
        {/* Header */}
        <header className="bg-blue-900 text-white shadow-xl">
          <div className="container mx-auto px-6 py-8">
            <div className="text-center">
              <div className="inline-block bg-orange-500 p-6 rounded-2xl mb-4 border-4 border-orange-400 shadow-lg">
                <h1 className="text-5xl font-bold mb-2 tracking-tight text-white">Casa Mais</h1>
                <p className="text-xl text-orange-100">Material de Construção</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          {/* Contact Info and Partner Brands */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information Column */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Informações de Contato</h2>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <MapPin className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">Endereço</p>
                    <p className="text-gray-600">Av Nossa Senhora de Fátima, 554</p>
                    <p className="text-gray-600">Agenor de Campos, Mongaguá - SP</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                  <Phone className="text-orange-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">Telefone</p>
                    <p className="text-gray-600">(13) 3303-4700</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-xl">
                  <Instagram className="text-pink-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">Instagram</p>
                    <p className="text-gray-600">@casamaismongagua</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-200">
                  <p className="text-2xl font-bold text-green-800 mb-2">🤔 Alguma dúvida?</p>
                  <p className="text-lg font-semibold text-green-700 mb-4">Chame no nosso WhatsApp!</p>
                  
                  <button 
                    onClick={openWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center space-x-3 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <MessageCircle size={28} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Partner Brands Column */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Empresas Parceiras</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {brands.map((brand, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200">
                      <p className="font-semibold text-gray-700">{brand}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => setCurrentPage('vendor-login')}
                    className="w-full bg-blue-900 hover:bg-blue-950 text-white px-12 py-6 rounded-2xl font-bold text-xl transform hover:scale-105 transition-all duration-200 shadow-xl"
                  >
                    <User className="inline-block mr-3" size={24} />
                    Área do Vendedor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'vendor-login') {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Área do Vendedor</h2>
            <p className="text-gray-600">Selecione seu nome para continuar</p>
          </div>

          <div className="space-y-4">
            {vendors.map((vendor) => (
              <button
                key={vendor}
                onClick={() => handleVendorLogin(vendor)}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-800 p-4 rounded-xl font-semibold transition-colors duration-200 border border-blue-200"
              >
                {vendor}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage('home')}
            className="mt-6 w-full text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'new-delivery') {
    return (
      <div className="min-h-screen bg-gray-800 p-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nova Entrega</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Cliente</label>
                <input
                  type="text"
                  value={newDelivery.clientName}
                  onChange={(e) => setNewDelivery({...newDelivery, clientName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone do Cliente</label>
                <input
                  type="text"
                  value={newDelivery.clientPhone}
                  onChange={(e) => setNewDelivery({...newDelivery, clientPhone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Produto do Cliente</label>
                <input
                  type="text"
                  value={newDelivery.product}
                  onChange={(e) => setNewDelivery({...newDelivery, product: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  value={newDelivery.address}
                  onChange={(e) => setNewDelivery({...newDelivery, address: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Entrega</label>
                <input
                  type="date"
                  value={newDelivery.deliveryDate}
                  onChange={(e) => setNewDelivery({...newDelivery, deliveryDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Observação Adicional (opcional)</label>
                <textarea
                  value={newDelivery.observation}
                  onChange={(e) => setNewDelivery({...newDelivery, observation: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleNewDelivery}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Salvar Entrega
                </button>
                <button
                  onClick={() => setCurrentPage('vendor-area')}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'missing-items') {
    return (
      <div className="min-h-screen bg-gray-800 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Marcar o que está faltando</h2>
            
            <div className="mb-8">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMissingItem}
                  onChange={(e) => setNewMissingItem(e.target.value)}
                  placeholder="Digite o item que está faltando..."
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddMissingItem}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {missingItems.map((item) => (
                <div key={item.id} className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{item.item}</p>
                      <p className="text-sm text-gray-600">Reportado por: {item.vendor}</p>
                      <p className="text-sm text-gray-600">Data: {new Date(item.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <AlertTriangle className="text-orange-600" size={24} />
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage('vendor-area')}
              className="mt-6 text-gray-500 hover:text-gray-700 font-medium"
            >
              ← Voltar para área do vendedor
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vendor Area
  const vendorDeliveries = deliveries.filter(d => d.vendor === selectedVendor);
  const pendingDeliveries = vendorDeliveries.filter(d => d.status === 'pending');
  const completedDeliveries = vendorDeliveries.filter(d => d.status === 'completed');
  const cancelledDeliveries = vendorDeliveries.filter(d => d.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Área do Vendedor - {selectedVendor}</h2>
            <button 
              onClick={() => {
                setSelectedVendor(null);
                setCurrentPage('home');
              }}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Sair
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setCurrentPage('new-delivery')}
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-semibold transition-colors duration-200"
            >
              <Plus className="mx-auto mb-2" size={24} />
              Nova Entrega
            </button>
            <button
              onClick={() => window.open('#', '_blank')}
              className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-semibold transition-colors duration-200"
            >
              <MessageCircle className="mx-auto mb-2" size={24} />
              Perguntar para Pops
            </button>
            <button
              onClick={() => setCurrentPage('missing-items')}
              className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl font-semibold transition-colors duration-200"
            >
              <AlertTriangle className="mx-auto mb-2" size={24} />
              Marcar Faltando
            </button>
            <button
              onClick={() => setCurrentPage('vendor-login')}
              className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-xl font-semibold transition-colors duration-200"
            >
              <User className="mx-auto mb-2" size={24} />
              Trocar Vendedor
            </button>
          </div>

          {/* Pending Deliveries */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Entregas Pendentes ({pendingDeliveries.length})</h3>
            <div className="space-y-4">
              {pendingDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg">{delivery.clientName}</h4>
                      <p className="text-gray-600">Telefone: {delivery.clientPhone}</p>
                      <p className="text-gray-600">Produto: {delivery.product}</p>
                      <p className="text-gray-600">Endereço: {delivery.address}</p>
                      <p className="text-gray-600">Data de Entrega: {new Date(delivery.deliveryDate).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-gray-500">Registrado em: {new Date(delivery.registrationDate).toLocaleDateString('pt-BR')}</p>
                      {delivery.observation && (
                        <p className="text-gray-600">Obs: {delivery.observation}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCompleteDelivery(delivery.id)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleCancelDelivery(delivery.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Deliveries */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Entregas Realizadas 2025 ({completedDeliveries.length})</h3>
            <div className="space-y-4">
              {completedDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{delivery.clientName}</h4>
                      <p className="text-gray-600">Produto: {delivery.product}</p>
                      <p className="text-gray-600">Data de Entrega: {new Date(delivery.deliveryDate).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-gray-500">Registrado em: {new Date(delivery.registrationDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cancelled Deliveries */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Entregas Canceladas ({cancelledDeliveries.length})</h3>
            <div className="space-y-4">
              {cancelledDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{delivery.clientName}</h4>
                      <p className="text-gray-600">Produto: {delivery.product}</p>
                      <p className="text-gray-600">Data de Entrega: {new Date(delivery.deliveryDate).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-gray-500">Registrado em: {new Date(delivery.registrationDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <X className="text-red-600" size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;