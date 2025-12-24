'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserData } from '@/types';
import { Loader2 } from 'lucide-react';

export default function UserForm({ onSubmit }: { onSubmit: (data: UserData) => void }) {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: '',
    age: 25,
    gender: 'male',
    height: 170,
    weight: 70,
    fitnessGoal: 'general-fitness',
    fitnessLevel: 'beginner',
    workoutLocation: 'home',
    dietaryPreference: 'vegetarian',
    medicalHistory: '',
    stressLevel: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full border-2 shadow-2xl rounded-2xl bg-linear-to-b from-black via-neutral-900 to-black text-white transition-all duration-300 ease-out ${
          isHovered
            ? 'border-green-400 dark:border-green-300 -translate-y-2 shadow-2xl shadow-green-500/20'
            : 'border-neutral-800 dark:border-green-400/50'
        }`}
      >
        <CardHeader className="text-center pb-2">
          <CardTitle className={`text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-green-400 via-green-500 to-green-400 transition-all duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}>
            Personal Fitness Profile
          </CardTitle>
          <CardDescription className="text-neutral-400 dark:text-neutral-300 text-sm transition-colors duration-300">
            Fill in your details to get your personalized AI-powered fitness plan
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-neutral-300 dark:text-neutral-200">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-neutral-300 dark:text-neutral-200">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-neutral-300 dark:text-neutral-200">
                    Gender
                  </Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value: string) => setFormData({ ...formData, gender: value as "male" | "female" | "other" })}
                    className="flex items-center space-x-4 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" className="border-neutral-600 dark:border-green-400/50" />
                      <Label htmlFor="male" className="text-neutral-300 dark:text-neutral-200">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" className="border-neutral-600 dark:border-green-400/50" />
                      <Label htmlFor="female" className="text-neutral-300 dark:text-neutral-200">
                        Female
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" className="border-neutral-600 dark:border-green-400/50" />
                      <Label htmlFor="other" className="text-neutral-300 dark:text-neutral-200">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-neutral-300 dark:text-neutral-200">
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                    className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-neutral-300 dark:text-neutral-200">
                    Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                    className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Fitness Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 cursor-pointer">
                <Label className="text-neutral-300 dark:text-neutral-200">
                  Fitness Goal
                </Label>
                <Select
                  value={formData.fitnessGoal}
                  onValueChange={(value: string) => setFormData({ ...formData, fitnessGoal: value as "weight-loss" | "muscle-gain" | "general-fitness" | "endurance" | "flexibility" })}
                >
                  <SelectTrigger className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 dark:bg-neutral-900 border-neutral-700 dark:border-green-400/30 text-neutral-200 dark:text-white">
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="general-fitness">General Fitness</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 cursor-pointer">
                <Label className="text-neutral-300 dark:text-neutral-200">
                  Current Fitness Level
                </Label>
                <Select
                  value={formData.fitnessLevel}
                  onValueChange={(value: string) => setFormData({ ...formData, fitnessLevel: value as "beginner" | "intermediate" | "advanced" })}
                >
                  <SelectTrigger className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 dark:bg-neutral-900 border-neutral-700 dark:border-green-400/30 text-neutral-200 dark:text-white">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 cursor-pointer">
                <Label className="text-neutral-300 dark:text-neutral-200">
                  Workout Location
                </Label>
                <Select
                  value={formData.workoutLocation}
                  onValueChange={(value: string) => setFormData({ ...formData, workoutLocation: value as "home" | "gym" | "outdoor" })}
                >
                  <SelectTrigger className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 dark:bg-neutral-900 border-neutral-700 dark:border-green-400/30 text-neutral-200 dark:text-white">
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="gym">Gym</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 cursor-pointer">
                <Label className="text-neutral-300 dark:text-neutral-200">
                  Dietary Preference
                </Label>
                <Select
                  value={formData.dietaryPreference}
                  onValueChange={(value: string) => setFormData({ ...formData, dietaryPreference: value as "vegetarian" | "non-vegetarian" | "vegan" | "keto" | "paleo" })}
                >
                  <SelectTrigger className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 dark:bg-neutral-900 border-neutral-700 dark:border-green-400/30 text-neutral-200 dark:text-white">
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Optional */}
            <div className="space-y-6">
              <div className="space-y-2 cursor-pointer">
                <Label className="text-neutral-300 dark:text-neutral-200">
                  Medical History (Optional)
                </Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  placeholder="Any injuries, conditions, or medications..."
                  className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200 resize-none"
                />
              </div>

              <div className="space-y-2 cursor-pointer">
                <Label className="text-neutral-300 dark:text-neutral-200">
                  Stress Level
                </Label>
                <Select
                  value={formData.stressLevel}
                  onValueChange={(value: string) => setFormData({ ...formData, stressLevel: value as "low" | "medium" | "high" })}
                >
                  <SelectTrigger className="bg-neutral-800 dark:bg-neutral-800 border-neutral-700 dark:border-green-400/30 focus:border-green-400 dark:focus:border-green-300 text-neutral-200 dark:text-white focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 dark:bg-neutral-900 border-neutral-700 dark:border-green-400/30 text-neutral-200 dark:text-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold bg-linear-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600 text-white hover:opacity-90 active:scale-95 transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl dark:shadow-green-500/20 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                'Generate My Plan'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}