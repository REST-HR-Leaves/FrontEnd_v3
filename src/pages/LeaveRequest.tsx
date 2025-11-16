import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeaves } from '@/context/LeavesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { validateLeaveRequest } from '@/utils/validators';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { isUrgentLeave } from '@/utils/dateHelpers';

const LeaveRequest = () => {
  const [type, setType] = useState<'urgent' | 'normal'>('normal');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showUrgentWarning, setShowUrgentWarning] = useState(false);
  const { createLeave, isLoading } = useLeaves();
  const navigate = useNavigate();

  const checkUrgent = (date: string) => {
    if (date) {
      const isUrgent = isUrgentLeave(date);
      setShowUrgentWarning(isUrgent);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validation = validateLeaveRequest({ startDate, endDate, type, notes });
    if (!validation.valid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

    try {
      await createLeave({ type, startDate, endDate, notes });
      toast.success('Leave request submitted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit leave request');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary">New Leave Request</h1>
        <p className="text-muted-foreground">Submit a new leave request for approval</p>
      </div>
      
      <Card className="shadow-lg border-secondary/20">
        <CardHeader>
          <CardTitle className="text-secondary">Leave Details</CardTitle>
          <CardDescription>
            Submit a new leave request for approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showUrgentWarning && (
            <Alert className="mb-4 border-warning">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription>
                Your leave starts within 24 hours. This will be automatically marked as urgent.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Leave Type</Label>
              <Select value={type} onValueChange={(value: 'urgent' | 'normal') => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal Leave</SelectItem>
                  <SelectItem value="urgent">Urgent Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    checkUrgent(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional information..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                Submit Request
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveRequest;
