import React from "react";
import { MdOutlinePrivacyTip } from "react-icons/md";

const PrivacySection = () => {
    return (
        <div className="bg-[#202b3b]/70 backdrop-blur-sm rounded-xl p-5 mb-6 border border-[#243447]/50">
            <div className="flex items-start gap-4">
                <div className="bg-cyan-500/20 p-2 rounded-lg">
                    <MdOutlinePrivacyTip size={24} className="text-cyan-400" />
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Privacy & Terms</h2>
                    <p className="text-sm text-gray-400 mb-4">
                        We're committed to protecting your privacy. We use data
                        solely to provide accurate weather information and
                        improve your experience.
                    </p>
                    <div className="flex gap-4 text-sm">
                        <a href="#" className="text-cyan-400 hover:underline">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-cyan-400 hover:underline">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacySection;
