import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, CalendarIcon, Upload, Search, Users, MessageSquare, Image, Eye, Send } from 'lucide-react';
import { DatePicker } from '@/components/DatePicker';
import { ImageUploader } from '@/components/ImageUploader';
import { ProductSelector } from '@/components/ProductSelector';
import { ContactSelector } from '@/components/ContactSelector';

export function SMSComposer() {
  const [selectedAudience, setSelectedAudience] = useState<'lists' | 'individuals'>('lists');
  const [message, setMessage] = useState("Ej: ¡Aprovecha nuestro producto solo hasta 2025-07-22!");
  const [expirationDate, setExpirationDate] = useState<Date>();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const characterCount = message.length;
  const maxCharacters = 160;
  const isNearLimit = characterCount > maxCharacters * 0.8;
  const isOverLimit = characterCount > maxCharacters;

  const totalRecipients = selectedAudience === 'lists' 
    ? selectedLists.reduce((sum, listId) => {
        // Simulated contact counts
        const counts: Record<string, number> = {
          'join': 557,
          'tt': 261,
          'mcp': 817,
          'devteam': 2
        };
        return sum + (counts[listId] || 0);
      }, 0)
    : selectedContacts.length;

  const estimatedCost = totalRecipients * 0.05; // $0.05 per SMS

  const steps = [
    { number: 1, title: 'Audiencia', icon: Users, completed: selectedAudience === 'lists' ? selectedLists.length > 0 : selectedContacts.length > 0 },
    { number: 2, title: 'Mensaje', icon: MessageSquare, completed: message.length > 0 && !isOverLimit },
    { number: 3, title: 'Configuración', icon: Calendar, completed: !!expirationDate },
    { number: 4, title: 'Contenido', icon: Image, completed: true }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center space-x-3 ${step.completed ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.completed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step.completed ? '✓' : step.number}
              </div>
              <div>
                <div className="font-medium">{step.title}</div>
                <step.icon className="h-4 w-4 mt-1" />
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-px mx-4 ${step.completed ? 'bg-success' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Audience Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</div>
                <span>Seleccionar Audiencia</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedAudience} onValueChange={(value) => setSelectedAudience(value as 'lists' | 'individuals')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="lists">Listas de Contactos</TabsTrigger>
                  <TabsTrigger value="individuals">Contactos Individuales</TabsTrigger>
                </TabsList>
                
                <TabsContent value="lists" className="mt-4">
                  <ContactSelector
                    type="lists"
                    selectedItems={selectedLists}
                    onSelectionChange={setSelectedLists}
                  />
                </TabsContent>
                
                <TabsContent value="individuals" className="mt-4">
                  <ContactSelector
                    type="individuals"
                    selectedItems={selectedContacts}
                    onSelectionChange={setSelectedContacts}
                  />
                </TabsContent>
              </Tabs>
              
              {totalRecipients > 0 && (
                <div className="mt-4 p-3 bg-accent rounded-lg">
                  <div className="text-sm font-medium">
                    Total de destinatarios: <span className="text-primary">{totalRecipients}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</div>
                <span>Mensaje SMS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="message">Contenido del mensaje</Label>
                  <div className={`text-sm font-medium ${
                    isOverLimit ? 'text-destructive' : 
                    isNearLimit ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {characterCount}/{maxCharacters}
                  </div>
                </div>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`min-h-24 resize-none ${isOverLimit ? 'border-destructive' : ''}`}
                  placeholder="Escribe tu mensaje aquí..."
                />
                {isOverLimit && (
                  <p className="text-destructive text-sm">
                    El mensaje excede el límite de caracteres para SMS. Se enviará como MMS.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</div>
                <span>Configuración</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de expiración</Label>
                  <DatePicker
                    date={expirationDate}
                    onDateChange={setExpirationDate}
                  />
                  <p className="text-sm text-muted-foreground">
                    Ejemplo: Oferta válida hasta 2025-07-22
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Producto Shopify</Label>
                  <ProductSelector
                    selectedProduct={selectedProduct}
                    selectedVariant={selectedVariant}
                    onProductChange={setSelectedProduct}
                    onVariantChange={setSelectedVariant}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: MMS Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">4</div>
                <span>Imagen MMS (Opcional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader
                onImageUpload={setUploadedImage}
                uploadedImage={uploadedImage}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Preview & Actions */}
        <div className="space-y-6">
          {/* Message Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Vista Previa</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <div className="bg-card border rounded-lg p-3 max-w-xs">
                  <div className="text-sm leading-relaxed">{message}</div>
                  {uploadedImage && (
                    <div className="mt-2">
                      <img src={uploadedImage} alt="MMS content" className="w-full rounded" />
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-2">
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Estimation */}
          <Card>
            <CardHeader>
              <CardTitle>Estimación de Costo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Destinatarios:</span>
                <span className="font-medium">{totalRecipients}</span>
              </div>
              <div className="flex justify-between">
                <span>Costo por SMS:</span>
                <span>$0.05</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total estimado:</span>
                <span className="text-primary">${estimatedCost.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa Completa
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
            >
              Guardar Borrador
            </Button>
            
            <Button 
              className="w-full" 
              disabled={totalRecipients === 0 || isOverLimit || !expirationDate}
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar SMS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}