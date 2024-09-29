import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvestorModule } from './investor/investor.module';
import { StartupModule } from './startup/startup.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { EmailModule } from './email/email.module';
import { MilestoneModule } from './milestone/milestone.module';
import { SmartContractModule } from './smart-contract/smart-contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), 
      }),
    }),
    InvestorModule,
    StartupModule,
    AuthModule,
    AdminModule,
    EmailModule,
    MilestoneModule,
    SmartContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
