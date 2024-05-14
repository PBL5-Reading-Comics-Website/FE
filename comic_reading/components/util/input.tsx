// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as React from "react";
import { cn } from "../../utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode; // Add this line for the suffix icon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, suffixIcon, ...props }, ref) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
                        radial-gradient(
                            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                            var(--orange-500),
                            transparent 80%
                        )
                    `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg flex transition duration-300 group/input relative"
      >
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `flex h-16 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-lg file:border-0 file:bg-transparent 
                        file:text-lg file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
                        focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                        disabled:cursor-not-allowed disabled:opacity-50
                        dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                        group-hover/input:shadow-none transition duration-400
                        ${icon ? 'pl-9' : ''} ${suffixIcon ? 'pr-9' : ''}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {suffixIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            {suffixIcon}
          </div>
        )}
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export { Input };

// SelectInput component
export interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string, label: string }[];
  icon?: React.ReactNode;
}

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, options, icon, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
      radial-gradient(
        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        var(--orange-500),
        transparent 80%
      )
    `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <select
          className={cn(
            `flex h-16 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-lg  file:border-0 file:bg-transparent 
    file:text-lg file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
    focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
    disabled:cursor-not-allowed disabled:opacity-50
    dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
    group-hover/input:shadow-none transition duration-400
    ${icon ? 'pl-6' : ''}`,
            className
          )}
          ref={ref}

          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {icon && <div className="absolute inset-y-0 flex items-center pointer-events-none">{icon}</div>}
      </motion.div>
    );
  }
);
SelectInput.displayName = "SelectInput";

export { SelectInput };

// DateTimeInput component
export interface DateTimeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const DateTimeInput = React.forwardRef<HTMLInputElement, DateTimeInputProps>(
  ({ className, icon, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
    radial-gradient(
      ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
      var(--orange-500),
      transparent 80%
    )
  `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <input
          type="date" // Changed from "datetime-local" to "date"
          className={cn(
            `flex w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-lg  file:border-0 file:bg-transparent 
    file:text-lg file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
    focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
    disabled:cursor-not-allowed disabled:opacity-50
    dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
    group-hover/input:shadow-none transition duration-400
    ${icon ? 'pr-6' : ''}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">{icon}</div>}
      </motion.div>
    );
  }
);
DateTimeInput.displayName = "DateTimeInput";

export { DateTimeInput };

