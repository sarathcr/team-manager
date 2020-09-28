import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  Country,
  Region,
  Role,
  UserData,
} from 'src/app/modules/auth/constants/model/login'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { CountryEntityService } from 'src/app/modules/project-editor/store/entity/country/country-entity.service'
import { RegionEntityService } from 'src/app/modules/project-editor/store/entity/region/region-entity.service'
import { DropdownConfigInit } from 'src/app/shared/constants/data/form-elements.data'
import { validatePhoneNumberRegex } from 'src/app/shared/utility/form.utility'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { userFormInit } from '../../constants/model/profile.data'

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss'],
})
export class UserDetailsFormComponent implements OnInit, OnDestroy {
  country$: Observable<Country[]>
  region$: Observable<Region[]>
  role$: Observable<Role[]>
  role = ''
  countryDropdown = new DropdownConfigInit('country')
  regionDropdown = new DropdownConfigInit('region')
  rolesDropdown = new DropdownConfigInit('role')
  subscriptions = new SubSink()
  invalidPhoneNo = false
  formData: UserData = userFormInit
  nullOption = { id: null, name: null }

  constructor(
    private countryService: CountryEntityService,
    private regionService: RegionEntityService,
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.userDetailFormInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  userDetailFormInit(): void {
    this.getDropdownDetails()
    this.setSelectedItems()
  }

  setSelectedItems(): void {
    this.formData = this.userService.userFormData
    if (this.formData.country.id) {
      this.countryDropdown.selectedItems = [this.formData.country]
    }
    if (this.formData.region.id) {
      this.regionDropdown.selectedItems = [this.formData.region]
    }
    if (this.formData.role) {
      this.rolesDropdown.selectedItems = this.rolesDropdown.data.filter(
        (role) => role.name === this.formData.role
      )
    }
    this.regionDropdown.disabled = !this.formData.region.id
  }

  getAllCountries(): void {
    this.subscriptions.sink = this.countryService.loading$.subscribe(
      (loading) => (this.countryDropdown.loading = loading)
    )
    this.subscriptions.sink = this.countryService.entities$.subscribe(
      (data) => {
        this.countryDropdown.data = data
        this.countryDropdown.disabled = false
        if (!data.length) {
          this.countryService.getAll()
        }
      }
    )
  }

  getAllRoles(): void {
    this.subscriptions.sink = this.translateService
      .stream([
        'PROFILE.user_role_option_1',
        'PROFILE.user_role_option_2',
        'PROFILE.user_role_option_3',
        'PROFILE.user_role_option_4',
        'PROFILE.user_role_option_5',
        'PROFILE.user_role_option_6',
        'PROFILE.user_role_option_7',
        'PROFILE.user_role_option_8',
        'PROFILE.user_role_option_9',
        'PROFILE.user_role_option_10',
        'PROFILE.user_role_option_11',
        'PROFILE.user_role_option_12',
      ])
      .subscribe((translations) => {
        const roles = [
          translations['PROFILE.user_role_option_1'],
          translations['PROFILE.user_role_option_2'],
          translations['PROFILE.user_role_option_3'],
          translations['PROFILE.user_role_option_4'],
          translations['PROFILE.user_role_option_5'],
          translations['PROFILE.user_role_option_6'],
          translations['PROFILE.user_role_option_7'],
          translations['PROFILE.user_role_option_8'],
          translations['PROFILE.user_role_option_9'],
          translations['PROFILE.user_role_option_10'],
          translations['PROFILE.user_role_option_11'],
          translations['PROFILE.user_role_option_12'],
        ]
        this.rolesDropdown.data = roles.map((role, index) => ({
          id: index,
          name: role,
        }))
        this.rolesDropdown.disabled = false
      })
  }

  getRegions(countryId: number): void {
    this.subscriptions.sink = this.regionService.loading$.subscribe(
      (loading) => (this.regionDropdown.loading = loading)
    )
    this.subscriptions.sink = this.regionService.entities$
      .pipe(
        map((regions) => {
          return regions.filter((region) => region.country?.id === countryId)
        })
      )
      .subscribe((newData) => {
        if (!newData?.length) {
          this.regionService.getWithQuery(countryId.toString())
        }
        this.regionDropdown.data = newData
        this.regionDropdown.disabled = false
      })
  }

  getDropdownDetails(): void {
    this.getAllCountries()
    this.getAllRoles()
    const { region, country } = this.userService.userFormData
    if (region?.id && country?.id) {
      this.getRegions(country.id)
    }
  }

  handleInputChange(value: string, field: string): void {
    if (field === 'phonenumber') {
      this.invalidPhoneNo = value ? !validatePhoneNumberRegex(value) : false
    }
    this.userService.userFormData[field] = value
    this.userService.checkStepOneValidity()
  }

  onDropdownSelect(selectedData: any): void {
    const { controller, val } = selectedData
    if (val.length) {
      const { id: selectedId, name } = val[0]
      if (controller === 'country') {
        if (!this.regionDropdown.disabled) {
          this.regionDropdown.selectedItems = []
        }
        this.userService.userFormData.region = this.nullOption
        this.getRegions(selectedId)
      }
      if (controller === 'role') {
        this.userService.userFormData[controller] = name
      } else {
        this.userService.userFormData[controller] = { id: selectedId, name }
      }
    } else {
      if (controller === 'country') {
        this.regionDropdown.selectedItems = []
        this.regionDropdown.disabled = true
        this.userService.userFormData.region = this.nullOption
      }
      if (controller === 'role') {
        this.userService.userFormData.role = ''
      } else {
        this.userService.userFormData[controller] = this.nullOption
      }
    }
    this.userService.checkStepOneValidity()
  }
}
