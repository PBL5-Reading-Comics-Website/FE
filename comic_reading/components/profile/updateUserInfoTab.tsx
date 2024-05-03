import { DateTimeInput, Input, SelectInput } from '../util/input.tsx'; // replace with actual path

interface UpdateUserInfoTabProps {
    avatarPath: string;
}

export function UpdateUserInfoTab({ avatarPath }: UpdateUserInfoTabProps) {
    return (
        <div className="flex items-center">
            <div className="w-7/12">
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
                        Name
                    </label>
                    <Input id="name" type="text" className="h-10" />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                        Email
                    </label>
                    <Input id="email" type="email" className="h-10" />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">
                        Username
                    </label>
                    <Input id="username" type="text" className="h-10" />
                </div>
                <div className="flex mb-2">
                    <div className="w-1/2 pr-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="dob">
                            Date of Birth
                        </label>
                        <DateTimeInput id="dob" className="h-10" />
                    </div>
                    <div className="w-1/2 pl-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="gender">
                            Gender
                        </label>
                        <SelectInput id="gender" className="h-10" options={[
                            { value: '', label: 'Select...' },
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                        ]} />
                    </div>
                </div>
            </div>
            <div className="ml-4 flex flex-col items-center">
                <img className="w-24 h-24 rounded-full mb-4" src={avatarPath} alt="User Avatar" /> 
                <button className="bg-[#929292] text-white font-bold py-2 px-4 rounded">
                    Thay đổi ảnh đại diện
                </button>
            </div>
        </div>
    );
}

export default UpdateUserInfoTab;