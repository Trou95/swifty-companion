'use client';
import React, { useEffect } from 'react';
import { Avatar, Card, Badge, Button, Chip } from '@nextui-org/react';
import { useAuth } from '@/context/auth-provider';
import BrowserAPI from '@/lib/browser.api';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user, setUser } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const projectStatusColor = (status: string) => {
    if (status == 'finished') return 'success';
    if (status == 'in_progress') return 'primary';
    if (status == 'creating_group') return 'secondary';
    return 'default';
  };

  const handleLogout = () => {
    setUser(null);
    BrowserAPI.clearTokens().then(() => push('/'));
  };

  return (
    <div className="bg-gray-100 max-w-md min-h-screen relative">
      <Card className="mx-auto">
        <Card>
          <div className="flex flex-row items-center space-x-4 pb-2 px-2">
            <Avatar
              src={user?.image}
              alt="User's profile picture"
              className="w-20 h-20 text-large"
            />
            <div>
              <h2 className="text-xl font-bold text-teal-700">
                {user?.fullName}
              </h2>
              <p className="text-gray-500">@{user?.login}</p>
              <div className="mt-2">
                <Badge color="primary" variant="flat">
                  Level: {user?.level}
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-6 mt-4">
            <div className="max-h-[500px] overflow-y-auto">
              <h2 className="text-lg font-semibold text-teal-700 mb-2">
                Projects
              </h2>
              <ul className="space-y-3">
                {user?.projects
                  .filter((p) => !p.name.includes('Piscine'))
                  .sort((a, b) => {
                    if (a.created_at < b.created_at) return -1;
                    return 0;
                  })
                  .map((project) => (
                    <li
                      key={project.name}
                      className="bg-white p-3 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium text-teal-600">
                          {project.name}
                        </h3>
                        <Chip
                          color={projectStatusColor(project.status)}
                          variant="bordered"
                        >
                          {project.status}
                        </Chip>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">Score:</span>
                        <div className="flex items-center">
                          <span
                            className={`text-2xl font-bold ${
                              project.final_mark >= 90
                                ? 'text-green-600'
                                : project.final_mark >= 70
                                  ? 'text-teal-600'
                                  : project.final_mark >= 50
                                    ? 'text-yellow-600'
                                    : 'text-red-600'
                            }`}
                          >
                            {project.final_mark}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            /100
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="p-2">
              <h2 className="text-lg font-semibold text-teal-700 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {user?.skills.map((skill) => (
                  <Chip key={skill.name} color="primary" variant="flat">
                    {skill.name}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </Card>
      <div className="w-full max-w-md min-h-10 bg-slate-400/80 backdrop-blur-md fixed bottom-0 ">
        <ul className="h-full flex items-center">
          <li className="w-1/2 p-2 bg-blue-600/80 text-center">Profil</li>
          <li className="w-1/2 p-2 text-center" onClick={handleLogout}>
            Çıkış
          </li>
        </ul>
      </div>
    </div>
  );
}
