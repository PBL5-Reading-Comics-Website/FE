import { ChangeEvent, useState } from 'react';
import { Input } from '../util/input.tsx';

export function ChangePasswordTab() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isCurrentPasswordTouched, setIsCurrentPasswordTouched] = useState(false);
    const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);

    const isFormValid = () => {
        return currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;
    }

    const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
        setIsCurrentPasswordTouched(true);
    }

    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
        setIsNewPasswordTouched(true);
    }

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setIsConfirmPasswordTouched(true);
    }

    return (
        <div>
            <h2 className='text-bold my-4'>ĐỔI MẬT KHẨU</h2>
            <div className='w-7/12'>
                <div className="mb-2">
                    <label className="block text-sm font-bold mb-2" htmlFor="currentPassword">
                        Nhập mật khẩu hiện tại
                    </label>
                    <Input id="currentPassword" type="password" className="h-10" value={currentPassword} onChange={handleCurrentPasswordChange} />
                    {!currentPassword && isCurrentPasswordTouched && <p className="text-red-500">Bắt buộc phải nhập</p>}
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-bold mb-2" htmlFor="newPassword">
                        Nhập mật khẩu mới
                    </label>
                    <Input id="newPassword" type="password" className="h-10" value={newPassword} onChange={handleNewPasswordChange} />
                    {!newPassword && isNewPasswordTouched && <p className="text-red-500">Bắt buộc phải nhập</p>}
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Nhập lại mật khẩu mới
                    </label>
                    <Input id="confirmPassword" type="password" className="h-10" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    {!confirmPassword && isConfirmPasswordTouched && <p className="text-red-500">Bắt buộc phải nhập</p>}
                    {confirmPassword && newPassword !== confirmPassword && isConfirmPasswordTouched && <p className="text-red-500">Mật khẩu không trùng khớp</p>}
                </div>
                <div className='m-8'></div>
                <button className="bg-[#ED741B] text-white font-bold py-2 px-4 rounded mt-4 w-full" onClick={isFormValid}>
                    CẬP NHẬT MẬT KHẨU
                </button>
            </div>
        </div>
    );
}

export default ChangePasswordTab;