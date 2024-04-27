module.exports = {
  apps: [
    {
      name: 'app-production',
      interpreter: 'none',
      script: 'npm',
      args: 'run start',
      instances: 1, //max
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '.pm2/logs/err.log',
      out_file: '.pm2/logs/out.log',
      log_file: '.pm2/logs/combined.log',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
