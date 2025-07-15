import { SMSComposer } from '@/components/SMSComposer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Compositor SMS/MMS</h1>
          <p className="text-muted-foreground">Interfaz mejorada para envío de mensajes</p>
        </div>
        <SMSComposer />
      </div>
    </div>
  );
};

export default Index;
