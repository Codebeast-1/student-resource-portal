import React from 'react';
import AuthForm from '@/components/AuthForm';
const Login: React.FC = () => {
  return <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-brand-900 text-white p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">SmartCampus</h1>
          <p className="text-lg mb-8">
            Streamline booking process for college halls and event spaces. Easily manage permissions and approvals.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Book Lecture Theaters & Classrooms</h3>
                <p className="text-white/80">Reserve spaces for academic and extracurricular activities</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Plan Events with Ease</h3>
                <p className="text-white/80">Choose from different packages for club and department events</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Quick Approval Process</h3>
                <p className="text-white/80">Track status of your requests in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <AuthForm />
      </div>
    </div>;
};
export default Login;