import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BookTableSection() {
  return (
    <section className="bg-surface py-xl px-margin-desktop w-full relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        <div className="flex flex-col gap-8 w-full max-w-md">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Book A Table</h2>
          <form className="flex flex-col gap-6 w-full">
            <div className="flex items-center border-b border-on-surface/50 py-2 focus-within:border-on-surface transition-colors">
              <label className="w-24 font-label-lg text-on-surface">Name:</label>
              <Input className="w-full bg-transparent border-none focus-visible:ring-0 text-on-surface font-body-md px-0 shadow-none" placeholder="John" type="text" />
            </div>
            <div className="flex items-center border-b border-on-surface/50 py-2 focus-within:border-on-surface transition-colors">
              <label className="w-24 font-label-lg text-on-surface">Email:</label>
              <Input className="w-full bg-transparent border-none focus-visible:ring-0 text-on-surface font-body-md px-0 shadow-none" placeholder="john@example.com" type="email" />
            </div>
            <div className="flex items-center border-b border-on-surface/50 py-2 focus-within:border-on-surface transition-colors">
              <label className="w-24 font-label-lg text-on-surface">Date:</label>
              <Input className="w-full bg-transparent border-none focus-visible:ring-0 text-on-surface font-body-md px-0 shadow-none" placeholder="MM/DD/YYYY" type="text" />
            </div>
            <div className="flex items-center border-b border-on-surface/50 py-2 focus-within:border-on-surface transition-colors">
              <label className="w-24 font-label-lg text-on-surface">Time:</label>
              <Input className="w-full bg-transparent border-none focus-visible:ring-0 text-on-surface font-body-md px-0 shadow-none" placeholder="HH/MM" type="text" />
            </div>
            <div className="flex items-center border-b border-on-surface/50 py-2 focus-within:border-on-surface transition-colors">
              <label className="w-24 font-label-lg text-on-surface">Phone:</label>
              <Input className="w-full bg-transparent border-none focus-visible:ring-0 text-on-surface font-body-md px-0 shadow-none" placeholder="+1 (555) 123-4567" type="tel" />
            </div>
            <div className="flex items-center border-b border-on-surface/50 py-2 focus-within:border-on-surface transition-colors relative">
              <label className="w-24 font-label-lg text-on-surface">Guests:</label>
              <Select>
                <SelectTrigger className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body-md px-0 shadow-none justify-between">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4+">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="button" className="mt-4 w-full bg-primary-container text-on-surface font-label-lg py-7 border-2 border-on-surface shadow-[4px_4px_0px_0px_#182B2B] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#182B2B] transition-all rounded-none h-auto">
              Submit
            </Button>
          </form>
        </div>
        <div className="h-[600px] w-full rounded-[40px] overflow-hidden rounded-bl-none relative">
          <Image alt="People gathering" fill className="object-cover" src="/images/homepage/book-table.jpg" />
        </div>
      </div>
    </section>
  );
}
