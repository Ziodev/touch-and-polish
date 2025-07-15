import React, { useState } from 'react';
import { Search, Users, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ContactSelectorProps {
  type: 'lists' | 'individuals';
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
}

const mockContactLists = [
  { id: 'join', name: 'join', count: 557 },
  { id: 'tt', name: 'tt', count: 261 },
  { id: 'mcp', name: 'mcp', count: 817 },
  { id: 'devteam', name: 'devteam', count: 2 }
];

const mockIndividualContacts = [
  { id: 'contact1', name: 'Teobaldo Vásquez', phone: '+13057838505' },
  { id: 'contact2', name: 'Donald J Paulin', phone: '+14016179944' },
  { id: 'contact3', name: 'Tom Emigh', phone: '+16164819185' },
  { id: 'contact4', name: 'Richard O\'Neill', phone: '+12026029943' },
  { id: 'contact5', name: 'Donald Williams', phone: '+19077381427' },
  { id: 'contact6', name: 'María García', phone: '+15551234567' },
  { id: 'contact7', name: 'Carlos López', phone: '+15559876543' },
  { id: 'contact8', name: 'Ana Martínez', phone: '+15555555555' }
];

export function ContactSelector({ type, selectedItems, onSelectionChange }: ContactSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleItemToggle = (itemId: string) => {
    const newSelection = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    onSelectionChange(newSelection);
  };

  const filteredLists = mockContactLists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = mockIndividualContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  if (type === 'lists') {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar listas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="text-sm text-muted-foreground mb-2">
          Selecciona una o varias listas. El mensaje se enviará a todos los contactos de cada lista seleccionada.
        </div>

        <ScrollArea className="h-48 border rounded-lg">
          <div className="p-4 space-y-2">
            {filteredLists.map((list) => (
              <div
                key={list.id}
                className="flex items-center space-x-3 p-2 rounded hover:bg-accent cursor-pointer"
                onClick={() => handleItemToggle(list.id)}
              >
                <Checkbox
                  checked={selectedItems.includes(list.id)}
                  onChange={() => handleItemToggle(list.id)}
                />
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{list.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {list.count} contactos
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {selectedItems.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Listas seleccionadas:</div>
            <div className="flex flex-wrap gap-2">
              {selectedItems.map(listId => {
                const list = mockContactLists.find(l => l.id === listId);
                return list ? (
                  <Badge key={listId} variant="secondary">
                    {list.name} ({list.count})
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar contactos por nombre o teléfono..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="text-sm text-muted-foreground mb-2">
        Selecciona uno o varios contactos individuales. El mensaje se enviará solo a ellos.
      </div>

      <ScrollArea className="h-64 border rounded-lg">
        <div className="p-4 space-y-2">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center space-x-3 p-2 rounded hover:bg-accent cursor-pointer"
              onClick={() => handleItemToggle(contact.id)}
            >
              <Checkbox
                checked={selectedItems.includes(contact.id)}
                onChange={() => handleItemToggle(contact.id)}
              />
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-muted-foreground">
                  {contact.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {selectedItems.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Contactos seleccionados:</div>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map(contactId => {
              const contact = mockIndividualContacts.find(c => c.id === contactId);
              return contact ? (
                <Badge key={contactId} variant="secondary">
                  {contact.name}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}