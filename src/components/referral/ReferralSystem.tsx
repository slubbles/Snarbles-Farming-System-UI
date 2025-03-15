
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, UserPlus, Users, Trophy, Gift, Copy, Check, LinkIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Progress } from "@/components/ui/progress";

interface ReferralSystemProps {
  userWallet?: string;
  referralCode?: string;
  joinedAt?: string;
  referralCount?: number;
  pointsEarned?: number;
  guild?: {
    name: string;
    members: number;
    level: number;
    totalPoints: number;
  } | null;
}

const ReferralSystem = ({
  userWallet = '',
  referralCode = `SNRB${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  joinedAt = new Date().toISOString(),
  referralCount = 0,
  pointsEarned = 0,
  guild = null
}: ReferralSystemProps) => {
  const [copied, setCopied] = useState(false);
  const [showJoinGuild, setShowJoinGuild] = useState(false);
  const [guildCode, setGuildCode] = useState('');
  
  // Calculate the referral URL based on current domain
  const referralUrl = `${window.location.origin}/?ref=${referralCode}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard. Share with friends to earn points!",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Snarbles!',
        text: 'Join my farming guild on Snarbles and earn rewards together!',
        url: referralUrl,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      handleCopy();
    }
  };
  
  const handleJoinGuild = () => {
    if (!guildCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid guild code",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Guild Joined!",
      description: "You've successfully joined the guild. Start farming together!",
    });
    
    // Close the join guild form
    setShowJoinGuild(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-[#3EC7AA]" />
            Your Referral Link
          </CardTitle>
          <CardDescription>
            Invite friends to join Snarbles and earn rewards together
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                value={referralUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button 
                size="icon" 
                onClick={handleCopy} 
                variant="outline"
                className="flex-shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-card/50 border border-border text-center">
                <p className="text-2xl font-bold">{referralCount}</p>
                <p className="text-sm text-muted-foreground">Friends Referred</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border text-center">
                <p className="text-2xl font-bold">{pointsEarned}</p>
                <p className="text-sm text-muted-foreground">Points Earned</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setShowJoinGuild(!showJoinGuild)}
            className="flex items-center"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {guild ? 'Switch Guild' : 'Join Guild'}
          </Button>
          <Button 
            onClick={handleShareClick}
            className="bg-gradient-to-r from-[#3EC7AA] to-[#0D6B36] hover:opacity-90 flex items-center"
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Share Link
          </Button>
        </CardFooter>
      </Card>
      
      {showJoinGuild && (
        <Card>
          <CardHeader>
            <CardTitle>Join a Guild</CardTitle>
            <CardDescription>
              Enter a guild code to join an existing guild
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guildCode">Guild Code</Label>
                <Input 
                  id="guildCode" 
                  placeholder="Enter guild code" 
                  value={guildCode}
                  onChange={(e) => setGuildCode(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowJoinGuild(false)}>
              Cancel
            </Button>
            <Button onClick={handleJoinGuild}>
              Join Guild
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {guild && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#3EC7AA]" />
              {guild.name}
            </CardTitle>
            <CardDescription>
              Level {guild.level} Guild • {guild.members} Members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Guild Progress</span>
                  <span>{guild.totalPoints.toLocaleString()} / {(guild.level + 1) * 10000} Points</span>
                </div>
                <Progress value={(guild.totalPoints / ((guild.level + 1) * 10000)) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-3 rounded-lg bg-card/50 border border-border">
                  <Trophy className="h-5 w-5 mb-1 text-amber-500" />
                  <span className="text-sm">Guild Rank</span>
                  <span className="font-bold">Top 10%</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-card/50 border border-border">
                  <Gift className="h-5 w-5 mb-1 text-[#3EC7AA]" />
                  <span className="text-sm">Guild Bonus</span>
                  <span className="font-bold">+15% Seeds</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Guild Details
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ReferralSystem;
