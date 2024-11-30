
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import User
from .serializers import UserProfileSerializer
class RegisterUserView(APIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    def post(self, request):
        # if email is already in use
        if User.objects.filter(email=request.data['email']).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get(self, request):
        serializer = UserProfileSerializer(request.user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # update user profile image
    def patch(self, request):

        user = User.objects.get(user_id=request.user.user_id)
        updated_fields = []

        if user.faculty != request.data.get('faculty', user.faculty):
            user.faculty = request.data.get('faculty', user.faculty)
            updated_fields.append('faculty')
        if user.images != request.data.get('images', user.images):
            user.images = request.data.get('images', user.images)
            updated_fields.append('images')
        if user.dob != request.data.get('dob', user.dob):
            user.dob = request.data.get('dob', user.dob)
            updated_fields.append('dob')
        if user.balance != request.data.get('balance', user.balance):
            user.balance = request.data.get('balance', user.balance)
            updated_fields.append('balance')

        if user.phone_number != request.data.get('phone_number', user.phone_number):
            user.phone_number = request.data.get('phone_number', user.phone_number)
            updated_fields.append('phone_number')

                                        
        if updated_fields:
            user.save()
            return Response({'message': f'Updated: {", ".join(updated_fields)}'}, status=status.HTTP_200_OK)
        else:
            if user.is_staff and request.data.get('user_id'):
                try:
                    customer = User.objects.get(user_id = request.data.get('user_id'))
                except User.DoesNotExist:
                    return Response({'message': 'No updates made'}, status=status.HTTP_200_OK)
                customer.is_staff = True
                customer.save()
                return Response({'message': f'User {customer.user_id} is now a staff'}, status=status.HTTP_200_OK)
            return Response({'message': 'No updates made'}, status=status.HTTP_200_OK)
        
class BalanceView(APIView):
    # permission_classes = {}
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            user = User.objects.get(user_id=request.user.user_id)
        except User.DoesNotExist:
            return Response({'message': 'User with this id does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'balance': user.balance}, status=status.HTTP_200_OK)
class DeleteView(APIView):
    permission_classes = (IsAdminUser,)
    def delete(self, request):
        if "user_id" not in request.data:
            return Response({'message': 'User_id is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user  = User.objects.get(user_id=request.data['user_id'])
        except User.DoesNotExist:
            return Response({'message': 'User with this ID does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        if user.is_superuser:
            return Response({'message': 'Cannot delete admin user.'}, status=status.HTTP_400_BAD_REQUEST)
        temp  = user.user_id
        user.delete()
        return Response({'message': f"Deleted user with id:{temp}"}, status=status.HTTP_200_OK)
class AllUsersView(APIView):
    permission_classes = (IsAdminUser,)


    def get(self, request):
        user_id = request.data.get('user_id', None)
        email = request.data.get('email', None)

        if not user_id and not email:
            users = User.objects.all()
        else:
            if user_id:
                users = User.objects.filter(user_id=user_id)
            elif email:
                users = User.objects.filter(email=email)

        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        if 'user_id' not in request.data:
            return Response({'message': 'Users id is required.'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(user_id=request.data['user_id'])
        except User.DoesNotExist:
            return Response({'message': 'User with this id does not exist.'},
                            status=status.HTTP_404_NOT_FOUND)


        updated_fields = []

        if user.faculty != request.data.get('faculty', user.faculty):
            user.faculty = request.data.get('faculty', user.faculty)
            updated_fields.append('faculty')
        if user.images != request.data.get('images', user.images):
            user.images = request.data.get('images', user.images)
            updated_fields.append('images')
        if user.dob != request.data.get('dob', user.dob):
            user.dob = request.data.get('dob', user.dob)
            updated_fields.append('dob')
        if user.balance != request.data.get('balance', user.balance):
            user.balance = request.data.get('balance', user.balance)
            updated_fields.append('balance')

        if user.phone_number != request.data.get('phone_number', user.phone_number):
            user.phone_number = request.data.get('phone_number', user.phone_number)
            updated_fields.append('phone_number')

        if updated_fields:
            user.save()
            return Response({'message': f'Updated: {", ".join(updated_fields)}'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No updates made'}, status=status.HTTP_200_OK)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        # token['username'] = user.username
        token['email'] = user.email
        token['password'] = user.password
        token['role'] = "admin" if user.is_superuser or user.is_staff else "customer"


        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
