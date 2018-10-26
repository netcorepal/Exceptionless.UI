import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../service/filter.service';
import { FilterStoreService } from '../../../service/filter-store.service';
import { AppConfigService } from '../../../service/app-config.service';
import { Intercom } from 'ng-intercom';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    type = 'type/';
    types = {
        exceptions: 'error',
        log: 'log',
        broken: '404',
        feature: 'usage',
        events: 'events'
    };
    actions = {
        list: 'list',
        edit: 'edit'
    };
    projectType = '';
    projectId = '';
    filterUrlPattern = '';

    constructor(
        private filterStoreService: FilterStoreService,
        private filterService: FilterService,
        private intercom: Intercom,
        private environment: AppConfigService
    ) {}

    ngOnInit() {
        this.filterStoreService.getProjectFilterEmitter().subscribe(item => {
            this.setFilterUrlPattern();
        });
        this.setFilterUrlPattern();
        if (this.isIntercomEnabled()) {
            this.intercom.boot({
                appId: this.environment.config.INTERCOM_APPID
            });
        }
    }

    setFilterUrlPattern() {
        if (this.filterService.getProjectType() === 'All Projects') {
            this.type = 'type/';
            this.filterUrlPattern = '';
        } else {
            this.type = '';
            this.projectId = this.filterService.getProjectTypeId();
            this.projectType = this.filterService.getProjectType();
            this.filterUrlPattern = `${this.projectType}/${this.projectId}/`;
        }
    }

    isIntercomEnabled() {
        return !!this.environment.config.INTERCOM_APPID;
    }

    showIntercom() {
        this.intercom.showNewMessage();
    }
}
