import { DateTimeInput, Input, SelectInput } from '../util/input.tsx'; // replace with actual path

interface UpdateUserInfoTabProps {
    avatarPath: string;
}

export function UpdateUserInfoTab({ avatarPath }: UpdateUserInfoTabProps) {
    return (
        <div>
            <h2 className='text-bold my-4'>CẬP NHẬT THÔNG TIN CÁ NHÂN</h2>
        <div className="flex items-center">
            
            <div className="w-7/12">
                <div className="mb-2">
                    <label className="block  text-sm font-bold mb-1" htmlFor="name">
                        Tên tài khoản
                    </label>
                    <Input id="name" type="text" className="h-10" />
                </div>
                <div className="mb-2">
                    <label className="block  text-sm font-bold mb-1" htmlFor="email">
                        Email
                    </label>
                    <Input id="email" type="email" className="h-10" />
                </div>
                <div className="mb-2">
                    <label className="block  text-sm font-bold mb-1" htmlFor="username">
                        Tên hiển thị
                    </label>
                    <Input id="username" type="text" className="h-10" />
                </div>
                <div className="flex mb-2">
                    <div className="w-1/2 pr-1">
                        <label className="block text-sm font-bold mb-1" htmlFor="dob">
                            Ngày sinh
                        </label>
                        <DateTimeInput id="dob" className="h-10" />
                    </div>
                    <div className="w-1/2 pl-1">
                        <label className="block text-sm font-bold mb-1" htmlFor="gender">
                            Giới tính
                        </label>
                        <SelectInput id="gender" className="h-10" options={[
                            { value: '', label: 'Chọn...' },
                            { value: 'male', label: 'Nam' },
                            { value: 'female', label: 'Nữ' },
                        ]} />
                    </div>
                </div>
                <button className="bg-[#ED741B] text-white font-bold py-2 px-4 rounded mt-4">
                    CẬP NHẬT
                </button>
            </div>
            <div className="ml-4 flex flex-col items-center">
                <img className="w-24 h-24 rounded-full mb-4" src={avatarPath} alt="User Avatar" />
                <button className="bg-[#929292] text-white font-bold py-2 px-4 rounded">
                    Thay đổi ảnh đại diện
                </button>
            </div>
        </div>
        </div>
    );
}

export default UpdateUserInfoTab;